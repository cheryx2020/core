import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./compress.module.scss";
import {
  DEFAULT_OPTIONS,
  OUTPUT_FORMATS,
  isAudioOnlyFormat,
  isGifFormat,
} from "./ffmpeg-options";
import {
  buildFFmpegArgs,
  buildGifArgs,
  getOutputFileName,
  getOutputMimeType,
  formatCommandPreview,
} from "./command-builder";
import OptionsPanel from "./options-panel";

// ── Analytics helper ──

const logEvent = (eventData) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    const { eventAction, event_category, event_label, value } = eventData;
    window.gtag("event", eventAction, {
      event_category,
      event_label,
      value,
    });
  }
};

// ── Constants ──

const COMPRESS_TYPE = {
  COMPRESS: "compress",
  GIF: "gif",
  CONVERT: "convert",
  AUDIO: "audio",
  CUSTOM: "custom",
};

const { COMPRESS, GIF, CONVERT, AUDIO, CUSTOM } = COMPRESS_TYPE;

const TITLE = {
  [COMPRESS]: "Compress Video",
  [GIF]: "Convert Video to GIF",
  [CONVERT]: "Convert Video",
  [AUDIO]: "Extract / Convert Audio",
  [CUSTOM]: "FFmpeg Custom",
};

const DESCRIPTION = {
  [COMPRESS]: "Reduce the file size while maximizing video quality.",
  [GIF]: "Convert your video to GIF format.",
  [CONVERT]: "Convert your video to a different format.",
  [AUDIO]: "Extract or convert the audio track from your video.",
  [CUSTOM]: "Full control over FFmpeg options.",
};

/**
 * Returns the default options object for a given conversion type.
 */
function getDefaultOptionsForType(type) {
  switch (type) {
    case GIF:
      return { ...DEFAULT_OPTIONS, outputFormat: "gif" };
    case AUDIO:
      return {
        ...DEFAULT_OPTIONS,
        outputFormat: "mp3",
        audioCodec: "libmp3lame",
        audioBitrate: "192k",
      };
    case COMPRESS:
      return {
        ...DEFAULT_OPTIONS,
        outputFormat: "mp4",
        videoCodec: "libx264",
        crf: 28,
        preset: "fast",
        audioCodec: "aac",
        audioBitrate: "128k",
      };
    case CONVERT:
    case CUSTOM:
    default:
      return { ...DEFAULT_OPTIONS };
  }
}

/**
 * Returns the file input accept attribute for a given type.
 */
function getAcceptAttribute(type) {
  if (type === AUDIO) return "video/*,audio/*";
  return "video/*";
}

// ── Main Component ──

const Compress = ({
  FFmpeg,
  fetchFile,
  coreURL,
  wasmURL,
  type = COMPRESS_TYPE.COMPRESS,
  // New props
  defaultOptions = {},
  showOptionsPanel = true,
  onOptionsChange,
  onCommandPreview,
  presets = null,
}) => {
  // ── State ──
  const [outputPreview, setOutputPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [conversionType, setConversionType] = useState(type);
  const inputRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputFileSize, setInputFileSize] = useState(0);
  const [outputFileSize, setOutputFileSize] = useState(0);
  const ffmpegRef = useRef(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ffmpegLogs, setFfmpegLogs] = useState([]);

  // FFmpeg options state — merge type defaults with caller overrides
  const [options, setOptions] = useState(() => ({
    ...getDefaultOptionsForType(type),
    ...defaultOptions,
  }));

  // Notify parent when options change
  useEffect(() => {
    if (onOptionsChange) onOptionsChange(options);
  }, [options, onOptionsChange]);

  // ── Timer ──
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);

  // ── FFmpeg instance ──
  const loadFFmpeg = async () => {
    const ffmpeg = new FFmpeg();
    await ffmpeg.load({ coreURL, wasmURL });
    ffmpegRef.current = ffmpeg;
  };

  // ── Helpers ──
  const getFileSize = (data, isGetFromLength) => {
    const size = isGetFromLength ? data.length : data.size;
    return (size / (1024 * 1024)).toFixed(2);
  };

  // ── Core processing ──
  const processFile = async (file) => {
    setLoading(true);
    setErrorMessage("");
    setFfmpegLogs([]);
    startTimer();
    setInputFileSize(getFileSize(file));

    try {
      if (!ffmpegRef.current) {
        await loadFFmpeg();
      }

      const ffmpeg = ffmpegRef.current;

      // Progress listener
      ffmpeg.on("progress", ({ progress: p }) => {
        setProgress(p);
      });

      // Log listener for error capture
      ffmpeg.on("log", ({ message }) => {
        setFfmpegLogs((prev) => [...prev, message]);
      });

      const inputVideoFileName = file.name;
      const outputFileName = getOutputFileName(inputVideoFileName, options);

      // Write input file to virtual FS
      await ffmpeg.writeFile(inputVideoFileName, await fetchFile(file));

      // Build and execute command(s)
      if (isGifFormat(options.outputFormat)) {
        // 2-pass GIF encoding for high quality
        const { pass1, pass2, paletteFile } = buildGifArgs(
          inputVideoFileName,
          outputFileName,
          options
        );

        if (onCommandPreview) {
          onCommandPreview({
            pass1: formatCommandPreview(pass1),
            pass2: formatCommandPreview(pass2),
          });
        }

        await ffmpeg.exec(pass1);
        await ffmpeg.exec(pass2);

        // Clean up palette file
        try {
          await ffmpeg.deleteFile(paletteFile);
        } catch (_) {
          /* ignore cleanup errors */
        }
      } else {
        const args = buildFFmpegArgs(inputVideoFileName, outputFileName, options);

        if (onCommandPreview) {
          onCommandPreview({ command: formatCommandPreview(args) });
        }

        await ffmpeg.exec(args);
      }

      // Read output
      const fileData = await ffmpeg.readFile(outputFileName);
      setOutputFileSize(getFileSize(fileData, true));

      const data = new Uint8Array(fileData);
      const mimeType = getOutputMimeType(options);
      const blob = new Blob([data.buffer], { type: mimeType });
      const outputURL = URL.createObjectURL(blob);
      setOutputPreview(outputURL);

      logEvent({
        eventAction: "compress_success",
        event_category: "Compress Result",
        event_label: `${conversionType} Success`,
        value: inputFileSize + " MB",
      });
    } catch (err) {
      const errMsg =
        err && err.message ? err.message : "An unknown error occurred.";
      setErrorMessage(errMsg);
      logEvent({
        eventAction: "compress_error",
        event_category: "Compress Result",
        event_label: `${conversionType} Error`,
        value: inputFileSize + " MB",
      });
    } finally {
      setLoading(false);
      stopTimer();
    }
  };

  // ── File input handler ──
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      logEvent({
        eventAction: "click",
        event_category: TITLE[conversionType] || "Convert",
        event_label: "Change File",
        value: getFileSize(file) + " MB",
      });
      processFile(file);
    }
  };

  // ── Download ──
  const handleDownload = () => {
    if (outputPreview) {
      logEvent({
        eventAction: "click",
        event_category: "Download Result",
        event_label: "Download Result",
      });
      const format = OUTPUT_FORMATS[options.outputFormat];
      const ext = format ? format.ext : ".mp4";
      const downloadLink = document.createElement("a");
      downloadLink.href = outputPreview;
      downloadLink.download = `output${ext}`;
      downloadLink.click();
    }
  };

  // ── Reset ──
  const reset = () => {
    setOutputPreview(null);
    setProgress(0);
    if (inputRef && inputRef.current) inputRef.current.value = "";
    setElapsedTime(0);
    setInputFileSize(0);
    setOutputFileSize(0);
    setErrorMessage("");
    setFfmpegLogs([]);
  };

  // ── Conversion type change ──
  const handleTypeChange = useCallback(
    (newType) => {
      setConversionType(newType);
      setOptions((prev) => ({
        ...getDefaultOptionsForType(newType),
        ...defaultOptions,
      }));
      reset();
    },
    [defaultOptions]
  );

  // ── Time formatting ──
  const percentageDone = parseFloat(`${progress * 100}`).toFixed(0);
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;
  const padTime = (value) => String(value).padStart(2, "0");
  const formattedTime =
    (hours > 0 ? `${padTime(hours)}:` : "") +
    `${padTime(minutes)}:${padTime(seconds)}`;

  const { wrapper, optionsToggle, errorAlert, logPanel } = styles ?? {};
  const audioOnly = isAudioOnlyFormat(options.outputFormat);
  const gifMode = isGifFormat(options.outputFormat);

  return (
    <div className={`container my-4 ${wrapper || ""}`}>
      {/* ── Header ── */}
      <h1 className="text-center">{TITLE[conversionType] || TITLE[COMPRESS]}</h1>
      <p className="text-center">
        {DESCRIPTION[conversionType] || DESCRIPTION[COMPRESS]}
      </p>

      {/* ── Type selector (only shown in CUSTOM mode or when multiple types are relevant) ── */}
      {type === CUSTOM && (
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
          {Object.entries(COMPRESS_TYPE).map(([key, value]) => (
            <button
              key={key}
              type="button"
              className={`btn btn-sm ${
                conversionType === value
                  ? "btn-primary"
                  : "btn-outline-secondary"
              }`}
              onClick={() => handleTypeChange(value)}
            >
              {TITLE[value]}
            </button>
          ))}
        </div>
      )}

      {/* ── Options panel toggle ── */}
      {showOptionsPanel && (
        <div className="mb-3 text-center">
          <button
            type="button"
            className={`btn btn-sm btn-outline-primary ${optionsToggle || ""}`}
            onClick={() => setPanelVisible((v) => !v)}
          >
            {panelVisible ? "Hide Settings" : "Show Settings"}
          </button>
        </div>
      )}

      {/* ── Options panel ── */}
      {showOptionsPanel && panelVisible && (
        <OptionsPanel options={options} onChange={setOptions} />
      )}

      {/* ── File input ── */}
      <input
        type="file"
        ref={inputRef}
        accept={getAcceptAttribute(conversionType)}
        onChange={handleFileChange}
        className="form-control mb-3"
      />

      {/* ── Error display ── */}
      {errorMessage && !loading && (
        <div className={`alert alert-danger ${errorAlert || ""}`} role="alert">
          <strong>Error:</strong>
          <pre>{errorMessage}</pre>
          {ffmpegLogs.length > 0 && (
            <details>
              <summary className="small">FFmpeg Log</summary>
              <pre>{ffmpegLogs.slice(-30).join("\n")}</pre>
            </details>
          )}
        </div>
      )}

      {/* ── Progress ── */}
      {loading && (
        <>
          <div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress * 100}%` }}
                aria-valuenow={percentageDone}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {`${percentageDone}%`}
              </div>
            </div>
          </div>
          <h2 className="display-4 fw-bold text-primary">
            ⏳ {formattedTime}
          </h2>
        </>
      )}

      {/* ── Output ── */}
      {outputPreview && !loading && (
        <>
          <div className="mb-3">
            <div className="d-flex flex-row">
              <button
                className="btn btn-outline-secondary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#compressionDetails"
                aria-expanded="false"
                aria-controls="compressionDetails"
                onClick={() => {
                  logEvent({
                    eventAction: "click",
                    event_category: "Behavior",
                    event_label: "Show Details",
                  });
                }}
              >
                Show Details
              </button>
              <button
                onClick={handleDownload}
                className="btn btn-success ms-1"
              >
                Download{" "}
                {OUTPUT_FORMATS[options.outputFormat]?.label || "File"}
              </button>
              <button onClick={reset} className="btn btn-outline-danger ms-1">
                Reset
              </button>
            </div>

            <div className="collapse mt-3" id="compressionDetails">
              <div className="card card-body text-muted">
                <div className="mb-2">
                  Input file size:{" "}
                  <span className="fw-bold">{inputFileSize} MB</span>
                </div>
                <div className="mb-2">
                  Output file size:{" "}
                  <span className="fw-bold">{outputFileSize} MB</span>
                </div>
                <div className="mb-2">
                  Compression:{" "}
                  <span className="fw-bold">
                    {inputFileSize && outputFileSize
                      ? `${(
                          (1 - outputFileSize / inputFileSize) *
                          100
                        ).toFixed(2)}%`
                      : "N/A"}
                  </span>
                </div>
                <div className="mb-2">
                  Computation time:{" "}
                  <span className="fw-bold">{formattedTime}</span>
                </div>

                {/* FFmpeg logs */}
                {ffmpegLogs.length > 0 && (
                  <details className="mb-2">
                    <summary className="small text-muted">
                      FFmpeg Log ({ffmpegLogs.length} lines)
                    </summary>
                    <div className={logPanel || ""}>
                      <pre>{ffmpegLogs.slice(-50).join("\n")}</pre>
                    </div>
                  </details>
                )}

                <div className="text-center">
                  <h3>Preview:</h3>
                  {gifMode ? (
                    <img
                      src={outputPreview}
                      alt="Converted GIF"
                      className="img-fluid mb-3"
                      style={{ maxWidth: "90%" }}
                    />
                  ) : audioOnly ? (
                    <audio
                      src={outputPreview}
                      controls
                      className="w-100 mb-3"
                    />
                  ) : (
                    <video
                      src={outputPreview}
                      controls
                      className="img-fluid mb-3"
                      style={{ maxWidth: "90%" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Compress.CompressType = COMPRESS_TYPE;

export default Compress;
