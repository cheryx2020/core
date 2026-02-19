/**
 * FFmpeg option definitions, codec/format mappings, presets, and defaults.
 */

export const OUTPUT_FORMATS = {
  mp4:  { ext: '.mp4',  mime: 'video/mp4',        label: 'MP4',          type: 'video' },
  webm: { ext: '.webm', mime: 'video/webm',        label: 'WebM',         type: 'video' },
  mov:  { ext: '.mov',  mime: 'video/quicktime',   label: 'MOV',          type: 'video' },
  avi:  { ext: '.avi',  mime: 'video/x-msvideo',   label: 'AVI',          type: 'video' },
  mkv:  { ext: '.mkv',  mime: 'video/x-matroska',  label: 'MKV',          type: 'video' },
  gif:  { ext: '.gif',  mime: 'image/gif',          label: 'GIF',          type: 'image' },
  mp3:  { ext: '.mp3',  mime: 'audio/mpeg',         label: 'MP3 (audio)',  type: 'audio' },
  aac:  { ext: '.aac',  mime: 'audio/aac',          label: 'AAC (audio)',  type: 'audio' },
  opus: { ext: '.opus', mime: 'audio/opus',         label: 'Opus (audio)', type: 'audio' },
  ogg:  { ext: '.ogg',  mime: 'audio/ogg',          label: 'OGG (audio)',  type: 'audio' },
  flac: { ext: '.flac', mime: 'audio/flac',         label: 'FLAC (audio)', type: 'audio' },
  wav:  { ext: '.wav',  mime: 'audio/wav',          label: 'WAV (audio)',  type: 'audio' },
};

export const VIDEO_CODECS = {
  libx264:      { label: 'H.264 (libx264)',      formats: ['mp4', 'mov', 'mkv', 'avi'], hasCrf: true,  hasPreset: true,  crfRange: [0, 51] },
  libx265:      { label: 'H.265 / HEVC',         formats: ['mp4', 'mkv'],               hasCrf: true,  hasPreset: true,  crfRange: [0, 63] },
  libvpx:       { label: 'VP8 (libvpx)',          formats: ['webm'],                     hasCrf: true,  hasPreset: false, crfRange: [0, 63] },
  // VP9: use constrained quality (CQ) mode — command builder emits -b:v 0 -crf <n>
  'libvpx-vp9': { label: 'VP9 (libvpx-vp9)',     formats: ['webm', 'mkv'],              hasCrf: true,  hasPreset: false, crfRange: [0, 63], cqMode: true },
  copy:         { label: 'Copy (no re-encode)',   formats: ['mp4', 'mov', 'mkv', 'avi', 'webm'], hasCrf: false, hasPreset: false, crfRange: [0, 0] },
};

export const AUDIO_CODECS = {
  aac:        { label: 'AAC',                formats: ['mp4', 'mov', 'mkv', 'aac'] },
  libmp3lame: { label: 'MP3 (LAME)',         formats: ['mp3', 'mkv', 'avi'] },
  libopus:    { label: 'Opus',               formats: ['webm', 'mkv', 'opus', 'ogg'] },
  libvorbis:  { label: 'Vorbis (OGG)',       formats: ['webm', 'mkv', 'ogg'] },
  flac:       { label: 'FLAC (lossless)',    formats: ['flac', 'mkv'] },
  pcm_s16le:  { label: 'PCM 16-bit (WAV)',   formats: ['wav'] },
  copy:       { label: 'Copy (no re-encode)', formats: ['mp4', 'mov', 'mkv', 'avi', 'webm'] },
};

export const PRESETS = [
  'ultrafast', 'superfast', 'veryfast', 'faster',
  'fast', 'medium', 'slow', 'slower', 'veryslow',
];

export const TUNE_OPTIONS = [
  '', 'film', 'animation', 'grain', 'stillimage',
  'fastdecode', 'zerolatency',
];

export const PIXEL_FORMATS = ['yuv420p', 'yuv422p', 'yuv444p'];

// H.264 profiles; H.265 uses main / main10 but libx265 accepts the same flag.
export const PROFILE_OPTIONS = ['', 'baseline', 'main', 'high'];

// Common H.264 levels. H.265 uses the same -level flag via libx265.
// 4.1 → 1080p30/720p60 (most compatible); 5.1 → 4K30; 6.2 → 8K.
export const LEVEL_OPTIONS = ['', '3.0', '3.1', '4.0', '4.1', '5.0', '5.1', '5.2', '6.0', '6.1', '6.2'];

export const SAMPLE_RATES = ['', '22050', '44100', '48000', '96000'];

export const ROTATION_OPTIONS = [
  { value: '', label: 'None' },
  { value: '90', label: '90° clockwise' },
  { value: '180', label: '180°' },
  { value: '270', label: '270° clockwise' },
];

export const DEFAULT_OPTIONS = {
  // Output
  outputFormat: 'mp4',

  // Video codec
  videoCodec: 'libx264',
  crf: 23,
  preset: 'medium',
  videoBitrate: '',
  maxrate: '',
  bufsize: '',
  pixelFormat: 'yuv420p',
  profile: '',
  level: '',
  tune: '',

  // Audio
  audioCodec: 'aac',
  audioBitrate: '128k',
  audioSampleRate: '',
  audioChannels: '',
  removeAudio: false,

  // Resolution & scaling
  width: '',
  height: '',

  // Frame rate
  frameRate: '',

  // Trim / cut
  startTime: '',
  duration: '',
  endTime: '',

  // Rotation & flip
  rotate: '',
  flipHorizontal: false,
  flipVertical: false,

  // Crop
  cropWidth: '',
  cropHeight: '',
  cropX: '',
  cropY: '',

  // Speed
  videoSpeed: '',
  audioSpeed: '',

  // GIF specific
  gifFps: 10,
  gifWidth: 480,

  // Advanced
  customVideoFilters: '',
  customAudioFilters: '',
  movflags: '+faststart',
  threads: '0',
  overwrite: true,
  customArgs: [],
};

/**
 * Built-in presets for common use cases.
 */
export const BUILT_IN_PRESETS = {
  webOptimized: {
    label: 'Web Optimized',
    description: 'Good quality, small file size for web delivery',
    options: {
      outputFormat: 'mp4',
      videoCodec: 'libx264',
      crf: 23,
      preset: 'medium',
      pixelFormat: 'yuv420p',
      audioCodec: 'aac',
      audioBitrate: '128k',
      height: '720',
      width: '',
      movflags: '+faststart',
    },
  },
  highQuality: {
    label: 'High Quality',
    description: 'Maximum quality, larger file size',
    options: {
      outputFormat: 'mp4',
      videoCodec: 'libx264',
      crf: 18,
      preset: 'slow',
      pixelFormat: 'yuv420p',
      audioCodec: 'aac',
      audioBitrate: '192k',
      width: '',
      height: '',
      movflags: '+faststart',
    },
  },
  smallFile: {
    label: 'Small File',
    description: 'Minimum file size, acceptable quality',
    options: {
      outputFormat: 'mp4',
      videoCodec: 'libx264',
      crf: 32,
      preset: 'fast',
      pixelFormat: 'yuv420p',
      audioCodec: 'aac',
      audioBitrate: '96k',
      height: '480',
      width: '',
      movflags: '+faststart',
    },
  },
  socialMedia: {
    label: 'Social Media',
    description: 'Optimized for social platforms (1080p)',
    options: {
      outputFormat: 'mp4',
      videoCodec: 'libx264',
      crf: 23,
      preset: 'medium',
      pixelFormat: 'yuv420p',
      audioCodec: 'aac',
      audioBitrate: '128k',
      height: '1080',
      width: '',
      movflags: '+faststart',
    },
  },
  gif: {
    label: 'GIF',
    description: 'Animated GIF with optimized palette',
    options: {
      outputFormat: 'gif',
      gifFps: 10,
      gifWidth: 480,
    },
  },
  audioExtract: {
    label: 'Extract Audio',
    description: 'Extract audio track as MP3',
    options: {
      outputFormat: 'mp3',
      audioCodec: 'libmp3lame',
      audioBitrate: '192k',
    },
  },
  streaming: {
    label: 'Streaming',
    description: 'Low-latency output for live streaming ingest (RTMP/HLS). Uses zerolatency tune with veryfast preset.',
    options: {
      outputFormat: 'mp4',
      videoCodec: 'libx264',
      crf: 23,
      preset: 'veryfast',
      tune: 'zerolatency',
      pixelFormat: 'yuv420p',
      profile: 'high',
      level: '4.1',
      audioCodec: 'aac',
      audioBitrate: '128k',
      audioSampleRate: '44100',
      height: '720',
      width: '',
      movflags: '+faststart',
    },
  },
  mobile: {
    label: 'Mobile',
    description: 'Optimized for mobile devices — H.264 Baseline profile for maximum compatibility, 720p.',
    options: {
      outputFormat: 'mp4',
      videoCodec: 'libx264',
      crf: 28,
      preset: 'medium',
      pixelFormat: 'yuv420p',
      profile: 'baseline',
      level: '3.1',
      audioCodec: 'aac',
      audioBitrate: '96k',
      audioSampleRate: '44100',
      audioChannels: '2',
      height: '720',
      width: '',
      movflags: '+faststart',
    },
  },
  archive: {
    label: 'Archive',
    description: 'Near-lossless archival quality. Slowest encoding, largest file, best quality.',
    options: {
      outputFormat: 'mkv',
      videoCodec: 'libx265',
      crf: 18,
      preset: 'veryslow',
      pixelFormat: 'yuv420p',
      audioCodec: 'flac',
      audioBitrate: '',
      width: '',
      height: '',
    },
  },
  opusWebm: {
    label: 'Opus / WebM',
    description: 'VP9 + Opus in WebM — open, royalty-free, ideal for the web.',
    options: {
      outputFormat: 'webm',
      videoCodec: 'libvpx-vp9',
      crf: 33,
      pixelFormat: 'yuv420p',
      audioCodec: 'libopus',
      audioBitrate: '128k',
      width: '',
      height: '',
    },
  },
};

/**
 * Returns the list of compatible video codecs for a given output format.
 */
export function getCompatibleVideoCodecs(format) {
  return Object.entries(VIDEO_CODECS)
    .filter(([, codec]) => codec.formats.includes(format))
    .map(([key, codec]) => ({ value: key, label: codec.label }));
}

/**
 * Returns the list of compatible audio codecs for a given output format.
 */
export function getCompatibleAudioCodecs(format) {
  return Object.entries(AUDIO_CODECS)
    .filter(([, codec]) => codec.formats.includes(format))
    .map(([key, codec]) => ({ value: key, label: codec.label }));
}

/**
 * Returns a suitable default video codec for the given format.
 */
export function getDefaultVideoCodec(format) {
  const compatible = getCompatibleVideoCodecs(format);
  if (compatible.length === 0) return '';
  // Prefer non-copy codecs
  const nonCopy = compatible.find(c => c.value !== 'copy');
  return nonCopy ? nonCopy.value : compatible[0].value;
}

/**
 * Returns a suitable default audio codec for the given format.
 */
export function getDefaultAudioCodec(format) {
  const compatible = getCompatibleAudioCodecs(format);
  if (compatible.length === 0) return '';
  const nonCopy = compatible.find(c => c.value !== 'copy');
  return nonCopy ? nonCopy.value : compatible[0].value;
}

/**
 * Checks if the given format is audio-only.
 */
export function isAudioOnlyFormat(format) {
  return OUTPUT_FORMATS[format]?.type === 'audio';
}

/**
 * Checks if the given format is GIF.
 */
export function isGifFormat(format) {
  return format === 'gif';
}
