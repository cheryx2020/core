import React, { useState, useRef, useEffect } from "react";

const Compress = ({ FFmpeg, fetchFile, coreURL, wasmURL }) => {
  const [outputPreview, setOutputPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [conversionType, setConversionType] = useState("gif");
  const inputRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputFileSize, setInputFileSize] = useState(0);
  const [outputFileSize, setOutputFileSize] = useState(0);
  const ffmpegRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return; // Do nothing if the timer is not running

    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup when unmounting
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const loadFFmpeg = async () => {
    const ffmpeg = new FFmpeg();
    await ffmpeg.load({ coreURL, wasmURL });
    ffmpegRef.current = ffmpeg;
  };

  const getFileSize = (data, isGetFromLength) => {
    const size = isGetFromLength ? data.length : data.size;
    return (size / (1024 * 1024)).toFixed(2);
  };

  const compress = async (file, isCompressVideo) => {
    setLoading(true);
    startTimer();
    setInputFileSize(getFileSize(file));
    try {
      if (!ffmpegRef.current) {
        await loadFFmpeg();
      }

      const ffmpeg = ffmpegRef.current;
      ffmpeg.on("progress", ({ progress }) => {
        setProgress(progress);
      });
      const inputVideoFileName = file.name;
      const fileNameWithoutExtension = file.name.split(".")[0];
      let outputFileName = `${fileNameWithoutExtension}.gif`;

      await ffmpeg.writeFile(inputVideoFileName, await fetchFile(file));
      if (isCompressVideo) {
        outputFileName = `${fileNameWithoutExtension}_compressed.mov`;
        await ffmpeg.exec([
          "-i",
          inputVideoFileName,
          "-vcodec",
          "libx264", // Use H.264 video codec
          "-crf",
          "28", // Set CRF for video quality/size tradeoff
          "-preset",
          "fast", // Use fast encoding preset
          "-acodec",
          "aac", // Use AAC audio codec
          "-b:a",
          "128k", // Set audio bitrate
          outputFileName,
        ]);
      } else {
        await ffmpeg.exec([
          "-i",
          inputVideoFileName,
          "-vf",
          "fps=10",
          outputFileName,
        ]);
      }

      const fileData = await ffmpeg.readFile(outputFileName);
      setOutputFileSize(getFileSize(fileData, true));
      const data = new Uint8Array(fileData);
      let blob = new Blob([data.buffer], { type: "image/gif" });
      if (isCompressVideo) {
        blob = new Blob([data.buffer], { type: "video/quicktime" });
      }
      const outputURL = URL.createObjectURL(blob);
      setOutputPreview(outputURL);
    } catch (err) {
    } finally {
      setLoading(false);
      stopTimer();
    }
  };

  const convertVideoToGIF = async (file) => {
    await compress(file);
  };

  const compressVideo = async (file) => {
    await compress(file, true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (conversionType === "gif") {
        convertVideoToGIF(file);
      } else {
        compressVideo(file);
      }
    }
  };

  const handleDownload = () => {
    if (outputPreview) {
      const downloadLink = document.createElement("a");
      downloadLink.href = outputPreview;
      downloadLink.download =
        conversionType === "gif" ? "output.gif" : "compressed_video.mp4";
      downloadLink.click();
    }
  };

  const reset = () => {
    setOutputPreview(null);
    setProgress(0);
    if (inputRef && inputRef.current) inputRef.current.value = "";
    setElapsedTime(0);
    setInputFileSize(0);
    setOutputFileSize(0);
  };

  const percentageDone = parseFloat(`${progress * 100}`).toFixed(0);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Video Compressor</h1>

      {/* Conversion type selection */}
      <div className="mb-3">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="conversionType"
            id="gifRadio"
            value="gif"
            checked={conversionType === "gif"}
            onChange={() => {
              setConversionType("gif");
              reset();
            }}
          />
          <label className="form-check-label" htmlFor="gifRadio">
            Convert to GIF
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="conversionType"
            id="compressRadio"
            value="compress"
            checked={conversionType === "compress"}
            onChange={() => {
              setConversionType("compress");
              reset();
            }}
          />
          <label className="form-check-label" htmlFor="compressRadio">
            Compress Video
          </label>
        </div>
      </div>

      {/* File input */}
      <input
        type="file"
        ref={inputRef}
        accept="video/*"
        onChange={handleFileChange}
        className="form-control mb-3"
      />

      {loading && (
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
      )}
      <h2 className="display-4 fw-bold text-primary">
        ⏳ {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </h2>
      {outputPreview && !loading && (
        <div className="text-center">
          <h3>Preview:</h3>
          <div className="text-muted mb-2">
            Input file size: <span className="fw-bold">{inputFileSize} MB</span>
          </div>
          <div className="text-muted mb-2">
            Output file size:{" "}
            <span className="fw-bold">{outputFileSize} MB</span>
          </div>
          <div className="text-muted mb-2">
            Compression:{" "}
            <span className="fw-bold">
              {inputFileSize && outputFileSize
                ? `${((1 - outputFileSize / inputFileSize) * 100).toFixed(2)}%`
                : "N/A"}
            </span>
          </div>
          {conversionType === "gif" ? (
            <img
              src={outputPreview}
              alt="Converted GIF"
              className="img-fluid mb-3"
              style={{ maxWidth: "90vw" }}
            />
          ) : (
            <video
              src={outputPreview}
              controls
              className="img-fluid mb-3"
              style={{ maxWidth: "90vw" }}
            />
          )}
          <br />
          <button onClick={handleDownload} className="btn btn-success">
            Download {conversionType === "gif" ? "GIF" : "Compressed Video"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Compress;
