# Compress Component

A browser-based video processing component powered by [FFmpeg.wasm](https://ffmpegwasm.netlify.app/). All processing runs entirely client-side — no files are uploaded to a server.

## Existing Features

### 1. Video Compression
- Compresses video files using H.264 (`libx264`) with CRF 28 and `fast` preset
- Audio re-encoded to AAC at 128 kbps
- Outputs `.mov` (QuickTime) container
- Reports input/output file sizes and compression ratio

### 2. Video to GIF Conversion
- Converts any video file to animated GIF
- Downsamples to 10 fps for smaller output
- Instant preview of the generated GIF

### 3. Progress & Timing
- Real-time progress bar driven by FFmpeg progress events
- Elapsed-time stopwatch displayed during processing

### 4. Output Preview & Download
- Collapsible details panel showing input size, output size, compression %, and computation time
- Inline preview (video player or image) of the result
- One-click download of the processed file

### 5. Analytics
- Google Analytics (`gtag`) events for: file selection, compression success/error, download, and detail toggle

## Usage

```jsx
import Compress from "@cheryx2020/core";
// Compress.CompressType = { COMPRESS: "compress", GIF: "gif" }

<Compress
  FFmpeg={FFmpeg}          // FFmpeg class from @ffmpeg/ffmpeg
  fetchFile={fetchFile}    // fetchFile from @ffmpeg/util
  coreURL={coreURL}        // URL to ffmpeg-core.js
  wasmURL={wasmURL}        // URL to ffmpeg-core.wasm
  type={Compress.CompressType.COMPRESS}  // or .GIF
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `FFmpeg` | class | *required* | `FFmpeg` constructor from `@ffmpeg/ffmpeg` |
| `fetchFile` | function | *required* | `fetchFile` from `@ffmpeg/util` |
| `coreURL` | string | *required* | URL to the ffmpeg-core.js file |
| `wasmURL` | string | *required* | URL to the ffmpeg-core.wasm file |
| `type` | string | `"compress"` | `"compress"` for video compression, `"gif"` for GIF conversion |

---

## Code Review — Issues & Improvements

### Bugs / Correctness

| # | Issue | Severity |
|---|-------|----------|
| 1 | **`COMPRESS` / `GIF` destructured twice** — once at module scope (line 20) and again inside the component (line 40). The inner destructure shadows the outer and is unnecessary. | Low |
| 2 | **`conversionType` state is never synced with `type` prop** — if the parent changes the `type` prop after mount the component still uses the initial value. The title/description already read from `type`, but the download button and conversion logic read from `conversionType`. | Medium |
| 3 | **`inputFileSize` used in the error analytics event may still be `0`** — `setInputFileSize` is async and the `logEvent` in the `catch` block captures the stale closure value. | Low |
| 4 | **Object URL is never revoked** — `URL.createObjectURL` creates a blob URL that stays in memory until the page is unloaded. There is no `URL.revokeObjectURL` call in `reset()` or on unmount. | Medium |
| 5 | **Download filename says `.mp4` but the blob is `video/quicktime` (`.mov`)** — `handleDownload` writes `compressed_video.mp4`, but the file was encoded into a `.mov` container. | Low |
| 6 | **No file-size or file-type validation** — users can select arbitrarily large files that will crash the WASM memory, or non-video files that FFmpeg will reject. | Medium |
| 7 | **No error UI** — if FFmpeg fails, the loading spinner disappears silently with no user feedback. | Medium |

### Code Quality

| # | Suggestion |
|---|-----------|
| A | Extract FFmpeg command profiles into a config object to avoid deep nesting in `compress()`. |
| B | Replace the Bootstrap collapse with React-controlled state for consistency (no jQuery dependency). |
| C | Add `PropTypes` or convert to TypeScript for type safety. |

---

## Improvement Plan — New Features

### Phase 1 — Stability & UX (Low effort)

| Task | Description |
|------|-------------|
| **Error feedback** | Show a user-facing error message (toast / alert) when compression fails. |
| **File validation** | Reject files above a configurable max size and validate MIME type before processing. |
| **Memory cleanup** | Revoke blob URLs on reset and component unmount. |
| **Fix download extension** | Match the download filename extension to the actual output format (`.mov` or `.mp4`). |
| **Cancel / abort** | Let users cancel an in-progress FFmpeg operation and reset state. |

### Phase 2 — Quality-of-Life (Medium effort)

| Task | Description |
|------|-------------|
| **Quality preset selector** | Expose a UI control (Low / Medium / High) that maps to CRF values (e.g. 23 / 28 / 35) so users can choose their size–quality trade-off. |
| **Output format picker** | Allow users to choose output container: MP4 (H.264), WebM (VP9), or MOV. |
| **Resolution scaling** | Add an option to downscale video resolution (e.g. 1080p → 720p → 480p) for further size reduction. |
| **GIF options** | Let users configure frame rate, width, and duration range (start/end trim) for GIF output. |
| **Drag-and-drop upload** | Support drag-and-drop in addition to the file input. |
| **Before/after preview** | Side-by-side or toggle preview comparing input and output. |

### Phase 3 — Extended Capabilities (Higher effort)

| Task | Description |
|------|-------------|
| **Audio extraction** | Extract audio track as MP3 / AAC / WAV from a video. |
| **Video trimming** | Let users set start and end timestamps to cut a clip before compressing. |
| **Batch processing** | Accept multiple files and process them sequentially with a queue UI. |
| **Thumbnail / frame extraction** | Extract a single frame or a set of thumbnails from a video. |
| **Subtitle burn-in** | Allow users to upload an SRT file and burn subtitles into the video. |
| **Watermark overlay** | Overlay a user-supplied image or text watermark on the output. |
| **Web Worker isolation** | Run FFmpeg in a dedicated Web Worker to keep the main thread responsive and prevent UI jank on large files. |

### Phase 4 — Platform (Optional / Long-term)

| Task | Description |
|------|-------------|
| **Server-side fallback** | For very large files or unsupported browsers, offer an optional server-side processing path. |
| **Shareable output links** | Generate temporary shareable URLs for processed files (requires backend storage). |
| **Usage analytics dashboard** | Aggregate the existing `gtag` events into a visible stats view (files processed, total MB saved). |
