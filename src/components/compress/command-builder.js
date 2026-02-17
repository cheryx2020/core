/**
 * Builds FFmpeg command-line argument arrays from an options object.
 * Pure functions — no FFmpeg dependency, easy to unit test.
 */

import { OUTPUT_FORMATS, isAudioOnlyFormat, isGifFormat } from './ffmpeg-options';

/**
 * Assembles the -vf filter chain from options.
 */
export function buildVideoFilters(options) {
  const filters = [];

  // Scale / resize
  if (options.width || options.height) {
    const w = options.width || -1;
    const h = options.height || -1;
    // force divisible-by-2 for most codecs
    filters.push(`scale=${w}:${h}:force_original_aspect_ratio=decrease`);
    filters.push('pad=ceil(iw/2)*2:ceil(ih/2)*2');
  }

  // Crop
  if (options.cropWidth && options.cropHeight) {
    const x = options.cropX || 0;
    const y = options.cropY || 0;
    filters.push(`crop=${options.cropWidth}:${options.cropHeight}:${x}:${y}`);
  }

  // Rotation
  if (options.rotate === '90') filters.push('transpose=1');
  else if (options.rotate === '180') filters.push('transpose=1,transpose=1');
  else if (options.rotate === '270') filters.push('transpose=2');

  // Flip
  if (options.flipHorizontal) filters.push('hflip');
  if (options.flipVertical) filters.push('vflip');

  // Speed (video)
  if (options.videoSpeed && parseFloat(options.videoSpeed) !== 1) {
    const factor = 1 / parseFloat(options.videoSpeed);
    filters.push(`setpts=${factor.toFixed(4)}*PTS`);
  }

  // Custom video filters (escape hatch)
  if (options.customVideoFilters) {
    filters.push(options.customVideoFilters);
  }

  return filters;
}

/**
 * Assembles the -af filter chain from options.
 */
export function buildAudioFilters(options) {
  const filters = [];

  // Speed (audio) — atempo only supports 0.5–2.0 per instance,
  // so we chain multiple for extreme values.
  if (options.audioSpeed && parseFloat(options.audioSpeed) !== 1) {
    let speed = parseFloat(options.audioSpeed);
    while (speed > 2.0) {
      filters.push('atempo=2.0');
      speed /= 2.0;
    }
    while (speed < 0.5) {
      filters.push('atempo=0.5');
      speed /= 0.5;
    }
    filters.push(`atempo=${speed.toFixed(4)}`);
  }

  if (options.customAudioFilters) {
    filters.push(options.customAudioFilters);
  }

  return filters;
}

/**
 * Builds a GIF-optimised two-pass argument set.
 *
 * Pass 1 generates a palette, pass 2 uses it for high-quality output.
 * Returns { pass1: string[], pass2: string[] }.
 */
export function buildGifArgs(inputFileName, outputFileName, options) {
  const fps = options.gifFps || 10;
  const width = options.gifWidth || 480;
  const paletteFile = '_palette.png';

  // Shared filters
  const baseFilters = [`fps=${fps}`, `scale=${width}:-1:flags=lanczos`];
  const extraFilters = buildVideoFilters({ ...options, width: '', height: '' }); // exclude scale (handled above)
  const allFilters = [...baseFilters, ...extraFilters].join(',');

  // Trim args
  const trimArgs = buildTrimArgs(options);

  const pass1 = [
    '-y',
    ...trimArgs.before,
    '-i', inputFileName,
    ...trimArgs.after,
    '-vf', `${allFilters},palettegen=stats_mode=diff`,
    '-update', '1',
    paletteFile,
  ];

  const pass2 = [
    '-y',
    ...trimArgs.before,
    '-i', inputFileName,
    '-i', paletteFile,
    ...trimArgs.after,
    '-lavfi', `${allFilters}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5`,
    outputFileName,
  ];

  return { pass1, pass2, paletteFile };
}

/**
 * Helper: trim-related args split into before-input and after-input groups.
 */
function buildTrimArgs(options) {
  const before = [];
  const after = [];

  // -ss before input = fast seek
  if (options.startTime) before.push('-ss', options.startTime);
  // -t / -to after input
  if (options.duration) after.push('-t', options.duration);
  else if (options.endTime) after.push('-to', options.endTime);

  return { before, after };
}

/**
 * Main entry point — converts an options object into an FFmpeg args array.
 *
 * For GIF output, use buildGifArgs() instead (two-pass).
 */
export function buildFFmpegArgs(inputFileName, outputFileName, options) {
  if (isGifFormat(options.outputFormat)) {
    // Caller should use buildGifArgs for proper 2-pass GIF encoding.
    // This fallback produces a simple single-pass GIF.
    return buildSimpleGifArgs(inputFileName, outputFileName, options);
  }

  const args = [];
  const audioOnly = isAudioOnlyFormat(options.outputFormat);

  // Overwrite
  if (options.overwrite) args.push('-y');

  // Trim (before input for fast seek)
  const trimArgs = buildTrimArgs(options);
  args.push(...trimArgs.before);

  // Input
  args.push('-i', inputFileName);

  // Trim (after input)
  args.push(...trimArgs.after);

  // ── Video ──
  if (audioOnly) {
    args.push('-vn');
  } else if (options.videoCodec) {
    args.push('-vcodec', options.videoCodec);

    if (options.videoCodec !== 'copy') {
      // Rate control
      if (options.videoBitrate) {
        args.push('-b:v', options.videoBitrate);
      } else if (options.crf !== undefined && options.crf !== '') {
        args.push('-crf', String(options.crf));
      }

      // Preset (H.264 / H.265)
      if (options.preset) args.push('-preset', options.preset);

      // Tune
      if (options.tune) args.push('-tune', options.tune);

      // Profile & level
      if (options.profile) args.push('-profile:v', options.profile);
      if (options.level) args.push('-level', options.level);

      // Max bitrate / buffer
      if (options.maxrate) args.push('-maxrate', options.maxrate);
      if (options.bufsize) args.push('-bufsize', options.bufsize);

      // Pixel format
      if (options.pixelFormat) args.push('-pix_fmt', options.pixelFormat);
    }
  }

  // ── Audio ──
  if (!audioOnly && options.removeAudio) {
    args.push('-an');
  } else if (options.audioCodec) {
    args.push('-acodec', options.audioCodec);
    if (options.audioCodec !== 'copy') {
      if (options.audioBitrate) args.push('-b:a', options.audioBitrate);
      if (options.audioSampleRate) args.push('-ar', options.audioSampleRate);
      if (options.audioChannels) args.push('-ac', String(options.audioChannels));
    }
  }

  // ── Video filters ──
  if (!audioOnly && options.videoCodec !== 'copy') {
    const vf = buildVideoFilters(options);
    if (vf.length > 0) args.push('-vf', vf.join(','));
  }

  // ── Audio filters ──
  if (options.audioCodec !== 'copy') {
    const af = buildAudioFilters(options);
    if (af.length > 0) args.push('-af', af.join(','));
  }

  // Frame rate
  if (!audioOnly && options.frameRate) args.push('-r', String(options.frameRate));

  // Threads
  if (options.threads) args.push('-threads', String(options.threads));

  // Movflags for mp4 streaming
  if (options.movflags && options.outputFormat === 'mp4') {
    args.push('-movflags', options.movflags);
  }

  // Custom args (escape hatch)
  if (options.customArgs && options.customArgs.length > 0) {
    args.push(...options.customArgs);
  }

  // Output
  args.push(outputFileName);
  return args;
}

/**
 * Simple single-pass GIF (fallback when 2-pass is not needed).
 */
function buildSimpleGifArgs(inputFileName, outputFileName, options) {
  const args = ['-y'];
  const trimArgs = buildTrimArgs(options);
  args.push(...trimArgs.before);
  args.push('-i', inputFileName);
  args.push(...trimArgs.after);

  const fps = options.gifFps || 10;
  const width = options.gifWidth || 480;
  const videoFilters = [`fps=${fps}`, `scale=${width}:-1:flags=lanczos`];
  const extra = buildVideoFilters({ ...options, width: '', height: '' });
  videoFilters.push(...extra);
  args.push('-vf', videoFilters.join(','));

  args.push(outputFileName);
  return args;
}

/**
 * Formats an args array as a human-readable command string for preview.
 */
export function formatCommandPreview(args) {
  return 'ffmpeg ' + args.map(a => (a.includes(' ') ? `"${a}"` : a)).join(' ');
}

/**
 * Derives the output filename from the input filename and options.
 */
export function getOutputFileName(inputFileName, options) {
  const baseName = inputFileName.replace(/\.[^.]+$/, '');
  const format = OUTPUT_FORMATS[options.outputFormat];
  if (!format) return `${baseName}_output.mp4`;
  return `${baseName}_output${format.ext}`;
}

/**
 * Returns the MIME type for the output format.
 */
export function getOutputMimeType(options) {
  const format = OUTPUT_FORMATS[options.outputFormat];
  return format ? format.mime : 'application/octet-stream';
}
