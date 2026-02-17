# Plan: Full FFmpeg Options Support for Compress Component

## Current State Analysis

### What exists today (`compress.js` - 330 lines)

The component currently supports only **2 hardcoded operations**:

| Mode | FFmpeg Command | Hardcoded Values |
|------|---------------|------------------|
| **Compress** | `-vcodec libx264 -crf 28 -preset fast -acodec aac -b:a 128k` | Codec, quality, preset, audio all fixed |
| **GIF** | `-vf fps=10` | FPS fixed at 10 |

**Key limitations:**
- Zero user-configurable options
- Only 2 output formats (`.mov`, `.gif`)
- No resolution/resize control
- No trim/cut capability
- No audio-only extraction
- No video filter support beyond fps

---

## Proposed Architecture

### Design Principle: Configuration-Driven Command Builder

Instead of hardcoding FFmpeg arguments, we introduce a **configuration object** that maps UI controls to FFmpeg arguments. The component remains a single `Compress` component but gains an `options` prop and optional built-in settings UI.

### New File Structure

```
src/components/compress/
  compress.js                  (refactored - main component)
  compress.module.scss         (expanded styles)
  compress.module.scss.d.ts
  ffmpeg-options.js            (NEW - option definitions & defaults)
  command-builder.js           (NEW - builds ffmpeg args from config)
  options-panel.js             (NEW - UI panel for adjusting settings)
```

---

## Phase 1: Core Options Engine (`ffmpeg-options.js` + `command-builder.js`)

### 1.1 Define Option Categories

Create a structured options definition covering all major FFmpeg capabilities relevant to browser-based usage:

```js
// ffmpeg-options.js

export const OUTPUT_FORMATS = {
  mp4:  { ext: '.mp4',  mime: 'video/mp4',       label: 'MP4' },
  webm: { ext: '.webm', mime: 'video/webm',      label: 'WebM' },
  mov:  { ext: '.mov',  mime: 'video/quicktime',  label: 'MOV' },
  avi:  { ext: '.avi',  mime: 'video/x-msvideo',  label: 'AVI' },
  mkv:  { ext: '.mkv',  mime: 'video/x-matroska', label: 'MKV' },
  gif:  { ext: '.gif',  mime: 'image/gif',        label: 'GIF' },
  mp3:  { ext: '.mp3',  mime: 'audio/mpeg',       label: 'MP3 (audio)' },
  wav:  { ext: '.wav',  mime: 'audio/wav',        label: 'WAV (audio)' },
  aac:  { ext: '.aac',  mime: 'audio/aac',        label: 'AAC (audio)' },
};

export const VIDEO_CODECS = {
  libx264:  { label: 'H.264 (libx264)',  formats: ['mp4','mov','mkv','avi'] },
  libx265:  { label: 'H.265/HEVC',       formats: ['mp4','mkv'] },
  libvpx:   { label: 'VP8 (libvpx)',     formats: ['webm'] },
  'libvpx-vp9': { label: 'VP9',          formats: ['webm','mkv'] },
  copy:     { label: 'Copy (no re-encode)', formats: ['mp4','mov','mkv','avi','webm'] },
};

export const AUDIO_CODECS = {
  aac:        { label: 'AAC',          formats: ['mp4','mov','mkv','aac'] },
  libmp3lame: { label: 'MP3 (LAME)',   formats: ['mp3','mkv','avi'] },
  libopus:    { label: 'Opus',         formats: ['webm','mkv'] },
  libvorbis:  { label: 'Vorbis',       formats: ['webm','mkv'] },
  pcm_s16le:  { label: 'PCM 16-bit',   formats: ['wav'] },
  copy:       { label: 'Copy (no re-encode)', formats: ['mp4','mov','mkv','avi','webm'] },
};

export const PRESETS = [
  'ultrafast','superfast','veryfast','faster',
  'fast','medium','slow','slower','veryslow'
];

export const DEFAULT_OPTIONS = {
  // -- Output --
  outputFormat: 'mp4',

  // -- Video Codec --
  videoCodec: 'libx264',
  crf: 23,                    // 0-51, lower = better quality
  preset: 'medium',
  videoBitrate: '',           // e.g. '2M', empty = use CRF mode
  maxrate: '',                // e.g. '2.5M'
  bufsize: '',                // e.g. '5M'
  pixelFormat: 'yuv420p',     // yuv420p, yuv444p, etc.
  profile: '',                // baseline, main, high
  level: '',                  // 3.0, 4.0, 4.1, etc.
  tune: '',                   // film, animation, grain, stillimage, etc.

  // -- Audio --
  audioCodec: 'aac',
  audioBitrate: '128k',
  audioSampleRate: '',        // e.g. '44100', '48000'
  audioChannels: '',          // 1 (mono), 2 (stereo)
  removeAudio: false,         // -an flag

  // -- Resolution & Scaling --
  width: '',                  // e.g. 1280, -1 for auto
  height: '',                 // e.g. 720, -1 for auto
  scaleFilter: '',            // computed: scale=1280:-1

  // -- Frame Rate --
  frameRate: '',              // e.g. '24', '30', '60'

  // -- Trim / Cut --
  startTime: '',              // -ss, e.g. '00:00:05' or '5'
  duration: '',               // -t, e.g. '00:00:30' or '30'
  endTime: '',                // -to, e.g. '00:01:00'

  // -- Rotation & Flip --
  rotate: '',                 // 0, 90, 180, 270
  flipHorizontal: false,
  flipVertical: false,

  // -- Crop --
  cropWidth: '',
  cropHeight: '',
  cropX: '',
  cropY: '',

  // -- Speed --
  videoSpeed: '',             // e.g. 0.5 (slow), 2.0 (fast)
  audioSpeed: '',             // e.g. 0.5 (slow), 2.0 (fast)

  // -- GIF-specific --
  gifFps: 10,
  gifWidth: 480,

  // -- Advanced Filters --
  customVideoFilters: '',     // raw -vf string appended
  customAudioFilters: '',     // raw -af string appended

  // -- Other --
  movflags: '+faststart',     // for mp4 streaming
  threads: '0',               // 0 = auto
  overwrite: true,            // -y flag
  customArgs: [],             // any extra raw args
};
```

### 1.2 Command Builder (`command-builder.js`)

A pure function that converts an options object into an FFmpeg argument array:

```js
// command-builder.js

export function buildFFmpegArgs(inputFileName, outputFileName, options) {
  const args = [];

  // Overwrite
  if (options.overwrite) args.push('-y');

  // Trim start (placed before -i for fast seek)
  if (options.startTime) args.push('-ss', options.startTime);

  // Input
  args.push('-i', inputFileName);

  // Duration / end time (placed after -i)
  if (options.duration) args.push('-t', options.duration);
  else if (options.endTime) args.push('-to', options.endTime);

  // Video codec
  if (options.removeVideo) {
    args.push('-vn');
  } else if (options.videoCodec) {
    args.push('-vcodec', options.videoCodec);

    if (options.videoCodec !== 'copy') {
      // Quality
      if (options.videoBitrate) {
        args.push('-b:v', options.videoBitrate);
      } else if (options.crf !== undefined && options.crf !== '') {
        args.push('-crf', String(options.crf));
      }
      // Preset (H.264/H.265 only)
      if (options.preset) args.push('-preset', options.preset);
      if (options.tune) args.push('-tune', options.tune);
      if (options.profile) args.push('-profile:v', options.profile);
      if (options.level) args.push('-level', options.level);
      // Rate control
      if (options.maxrate) args.push('-maxrate', options.maxrate);
      if (options.bufsize) args.push('-bufsize', options.bufsize);
      // Pixel format
      if (options.pixelFormat) args.push('-pix_fmt', options.pixelFormat);
    }
  }

  // Audio codec
  if (options.removeAudio) {
    args.push('-an');
  } else if (options.audioCodec) {
    args.push('-acodec', options.audioCodec);
    if (options.audioCodec !== 'copy') {
      if (options.audioBitrate) args.push('-b:a', options.audioBitrate);
      if (options.audioSampleRate) args.push('-ar', options.audioSampleRate);
      if (options.audioChannels) args.push('-ac', String(options.audioChannels));
    }
  }

  // Video filters (-vf)
  const videoFilters = buildVideoFilters(options);
  if (videoFilters.length > 0) {
    args.push('-vf', videoFilters.join(','));
  }

  // Audio filters (-af)
  const audioFilters = buildAudioFilters(options);
  if (audioFilters.length > 0) {
    args.push('-af', audioFilters.join(','));
  }

  // Frame rate
  if (options.frameRate) args.push('-r', String(options.frameRate));

  // Threads
  if (options.threads) args.push('-threads', String(options.threads));

  // Movflags (for mp4 fast start)
  if (options.movflags && options.outputFormat === 'mp4') {
    args.push('-movflags', options.movflags);
  }

  // Custom args (escape hatch)
  if (options.customArgs?.length > 0) {
    args.push(...options.customArgs);
  }

  // Output
  args.push(outputFileName);
  return args;
}

function buildVideoFilters(options) {
  const filters = [];

  // Scale / Resize
  if (options.width || options.height) {
    const w = options.width || -1;
    const h = options.height || -1;
    filters.push(`scale=${w}:${h}`);
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

  // Speed
  if (options.videoSpeed) filters.push(`setpts=${1 / parseFloat(options.videoSpeed)}*PTS`);

  // GIF palette (for high-quality GIFs)
  // Note: handled separately via 2-pass in compress function

  // Custom
  if (options.customVideoFilters) filters.push(options.customVideoFilters);

  return filters;
}

function buildAudioFilters(options) {
  const filters = [];

  if (options.audioSpeed) filters.push(`atempo=${options.audioSpeed}`);
  if (options.customAudioFilters) filters.push(options.customAudioFilters);

  return filters;
}
```

**Why this approach:**
- Pure function = easy to test
- No FFmpeg dependency = can unit test without WASM
- Extensible = add new options by adding to `DEFAULT_OPTIONS` + a few lines in `buildFFmpegArgs`

---

## Phase 2: Options Panel UI (`options-panel.js`)

### 2.1 Collapsible Settings Panel

A React component that renders controls for all options, organized into sections:

**Section layout:**

| Section | Controls |
|---------|----------|
| **Output Format** | Dropdown: MP4, WebM, MOV, AVI, MKV, GIF, MP3, WAV, AAC |
| **Video** | Codec dropdown, CRF slider (0-51), Preset dropdown, Bitrate input, Pixel format |
| **Audio** | Codec dropdown, Bitrate input, Sample rate, Channels, Remove audio toggle |
| **Resize** | Width/Height inputs with lock-aspect-ratio toggle |
| **Trim** | Start time, End time / Duration inputs |
| **Transform** | Rotation dropdown (0/90/180/270), Flip H/V toggles |
| **Crop** | Width, Height, X offset, Y offset |
| **Speed** | Video speed slider (0.25x - 4x), Audio speed slider |
| **Advanced** | Custom video filters, Custom audio filters, Custom args, Threads |

### 2.2 Smart Defaults & Validation

- When output format changes, auto-select a compatible video/audio codec
- Disable video settings when output is audio-only (MP3/WAV/AAC)
- Disable audio settings when "Remove audio" is toggled
- Show CRF slider only when CRF mode is active (no video bitrate set)
- Show preset/tune only for H.264/H.265 codecs
- Validate CRF range based on codec (0-51 for x264, 0-63 for x265)

### 2.3 Presets (Quick Settings)

Provide built-in presets for common use cases:

| Preset Name | Description | Key Settings |
|-------------|-------------|-------------|
| **Web Optimized** | Small file, good quality for web | MP4, H.264, CRF 23, preset medium, 720p, faststart |
| **High Quality** | Maximum quality | MP4, H.264, CRF 18, preset slow, original resolution |
| **Small File** | Minimum size | MP4, H.264, CRF 32, preset fast, 480p |
| **Social Media** | Instagram/Twitter ready | MP4, H.264, CRF 23, 1080x1080 or 1080x1920 |
| **GIF** | Animated GIF | GIF, 10fps, 480px wide |
| **Audio Extract** | Extract audio only | MP3, 192k bitrate |
| **Custom** | User-defined | All options unlocked |

---

## Phase 3: Refactor `compress.js`

### 3.1 New Props Interface

```js
const Compress = ({
  FFmpeg,
  fetchFile,
  coreURL,
  wasmURL,
  type = COMPRESS_TYPE.COMPRESS,
  // --- NEW PROPS ---
  defaultOptions = {},        // Override default FFmpeg options
  showOptionsPanel = true,    // Show/hide the built-in settings UI
  onOptionsChange,            // Callback when options change: (options) => void
  onCommandPreview,           // Callback with generated command: (args[]) => void
  presets = null,             // Custom presets array, null = use built-in
}) => { ... }
```

### 3.2 Core Changes

1. **Replace hardcoded `ffmpeg.exec()` calls** with `buildFFmpegArgs()` output
2. **Merge `defaultOptions` prop** with `DEFAULT_OPTIONS` as initial state
3. **Add `options` state** managed by the options panel
4. **Output format drives MIME type** via the `OUTPUT_FORMATS` map (no more hardcoded blobs)
5. **GIF 2-pass support**: When format is GIF, run a 2-pass encode for better quality:
   - Pass 1: Generate palette (`palettegen`)
   - Pass 2: Use palette (`paletteuse`)
6. **Command preview**: Display the generated FFmpeg command string so users know exactly what will run

### 3.3 Backward Compatibility

The component remains backward-compatible. Without new props, it behaves identically to today:

```jsx
// Existing usage still works exactly the same
<Compress FFmpeg={FFmpeg} fetchFile={fetchFile} coreURL={...} wasmURL={...} />

// New usage with options
<Compress
  FFmpeg={FFmpeg}
  fetchFile={fetchFile}
  coreURL={...}
  wasmURL={...}
  showOptionsPanel={true}
  defaultOptions={{ outputFormat: 'webm', videoCodec: 'libvpx-vp9', crf: 30 }}
/>
```

---

## Phase 4: Extended COMPRESS_TYPE

Expand the type enum to cover new operations:

```js
const COMPRESS_TYPE = {
  COMPRESS: 'compress',
  GIF: 'gif',
  CONVERT: 'convert',        // Generic format conversion
  AUDIO: 'audio',            // Audio extraction/conversion
  CUSTOM: 'custom',          // Full manual control
};
```

Each type sets different default options and shows/hides relevant UI sections.

---

## Phase 5: Error Handling & Validation

### 5.1 Input Validation
- Validate file type before processing
- Warn on large files (configurable threshold)
- Validate option combinations (e.g., VP9 codec can't output to MP4)

### 5.2 Error Display
- Show FFmpeg stderr output to user on failure (currently swallowed)
- Categorize common errors with user-friendly messages:
  - "Unsupported codec" -> suggest alternatives
  - "File too large" -> suggest reducing resolution/quality
  - Out of memory -> suggest smaller files or lower quality settings

### 5.3 FFmpeg Log Capture
- Add `ffmpeg.on('log', ...)` listener
- Store logs in state
- Show in expandable "FFmpeg Log" section (useful for debugging)

---

## Implementation Summary

| Phase | Files Changed/Added | Scope |
|-------|-------------------|-------|
| **Phase 1** | `ffmpeg-options.js` (new), `command-builder.js` (new) | Pure logic, no UI changes |
| **Phase 2** | `options-panel.js` (new), `compress.module.scss` (updated) | New UI component |
| **Phase 3** | `compress.js` (refactored) | Integration, backward-compatible |
| **Phase 4** | `compress.js`, `ffmpeg-options.js` | New type modes |
| **Phase 5** | `compress.js` | Error handling & logging |

---

## What This Plan Does NOT Cover (Out of Scope)

These are explicitly excluded to keep the scope manageable:

1. **Multi-input operations** (e.g., concatenating multiple videos, adding watermark images) - would require a fundamentally different UI
2. **Streaming/real-time processing** - FFmpeg.wasm does not support this well
3. **Hardware acceleration** - not available in browser WASM
4. **Batch processing** - processing multiple files at once (could be a future feature)
5. **Video preview with seek** - would require a separate player component
6. **Subtitle support** (-srt, -ass embedding) - complex and niche
7. **Complex filter graphs** (`-filter_complex`) - too advanced for a UI, users can use `customArgs` as escape hatch

---

## Questions for Review

1. **Options panel visibility**: Should the options panel be shown by default or collapsed? My recommendation is collapsed with a "Settings" button, to not overwhelm users who just want the simple compress/GIF flow.

2. **Preset scope**: Are the 6 proposed presets (Web Optimized, High Quality, Small File, Social Media, GIF, Audio Extract) sufficient, or do you want more/different ones?

3. **Custom args escape hatch**: The `customArgs` prop and text field lets power users pass raw FFmpeg arguments. Should this be hidden behind an "Advanced" toggle or always visible?

4. **Audio-only modes**: Do you want full audio-only conversion support (e.g., MP3-to-WAV, audio bitrate changes), or is audio extraction from video sufficient?

5. **Phase priority**: Would you prefer I implement all phases sequentially, or prioritize specific phases first?
