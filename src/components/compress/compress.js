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
    if (!isRunning) return;
    const interval = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);

  const loadFFmpeg = async () => {
    const ffmpeg = new FFmpeg();
    await ffmpeg.load({ coreURL, wasmURL });
    ffmpegRef.current = ffmpeg;
  };

  const getFileSize = (data, isFromLength = false) => {
    const size = isFromLength ? data.length : data.size;
    return (size / (1024 * 1024)).toFixed(2);
  };

  const convertVideoToGIF = async (file) => {
    setLoading(true);
    startTimer();
    setInputFileSize(getFileSize(file));

    if (!ffmpegRef.current) {
      await loadFFmpeg();
    }

    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("progress", ({ progress }) => setProgress(progress));
    const inputVideoFileName = file.name;
    const outputGifFileName = `${file.name.split(".")[0]}.gif`;

    await ffmpeg.writeFile(inputVideoFileName, await fetchFile(file));
    await ffmpeg.exec(["-i", inputVideoFileName, "-vf", "fps=10", outputGifFileName]);

    const fileData = await ffmpeg.readFile(outputGifFileName);
    setOutputFileSize(getFileSize(fileData, true));
    const gifBlob = new Blob([new Uint8Array(fileData).buffer], { type: "image/gif" });

    setOutputPreview(URL.createObjectURL(gifBlob));
    setLoading(false);
    stopTimer();
  };

  const compressVideo = async (file) => {
    setLoading(true);
    startTimer();
    setInputFileSize(getFileSize(file));

    try {
      if (!ffmpegRef.current) {
        await loadFFmpeg();
      }

      const ffmpeg = ffmpegRef.current;
      ffmpeg.on("progress", ({ progress }) => setProgress(progress));
      const inputVideoFileName = file.name;
      const outputVideoFileName = `${file.name.split(".")[0]}_compressed.mov`;

      await ffmpeg.writeFile(inputVideoFileName, await fetchFile(file));
      await ffmpeg.exec([
        "-i", inputVideoFileName,
        "-vcodec", "libx264",
        "-crf", "28",
        "-preset", "fast",
        "-acodec", "aac",
        "-b:a", "128k",
        outputVideoFileName
      ]);

      const fileData = await ffmpeg.readFile(outputVideoFileName);
      setOutputFileSize(getFileSize(fileData, true));
      const videoBlob = new Blob([new Uint8Array(fileData).buffer], { type: "video/quicktime" });

      setOutputPreview(URL.createObjectURL(videoBlob));
    } catch (error) {
      console.error("Error during video compression:", error);
    } finally {
      setLoading(false);
      stopTimer();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) conversionType === "gif" ? convertVideoToGIF(file) : compressVideo(file);
  };

  const handleDownload = () => {
    if (outputPreview) {
      const link = document.createElement("a");
      link.href = outputPreview;
      link.download = conversionType === "gif" ? "output.gif" : "compressed_video.mp4";
      link.click();
    }
  };

  const reset = () => {
    setOutputPreview(null);
    setProgress(0);
    inputRef.current && (inputRef.current.value = "");
    setElapsedTime(0);
    setInputFileSize(0);
    setOutputFileSize(0);
  };

  const percentageDone = (progress * 100).toFixed(0);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Video Converter</h1>

      {/* Conversion type selection */}
      <div className="mb-3">
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="conversionType" checked={conversionType === "gif"} onChange={() => { setConversionType("gif"); reset(); }} />
          <label className="form-check-label">Convert to GIF</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="conversionType" checked={conversionType === "compress"} onChange={() => { setConversionType("compress"); reset(); }} />
          <label className="form-check-label">Compress Video</label>
        </div>
      </div>

      {/* File input */}
      <input type="file" ref={inputRef} accept="video/*" onChange={handleFileChange} className="form-control mb-3" />

      {loading && <div className="progress"><div className="progress-bar" role="progressbar" style={{ width: `${percentageDone}%` }}>{`${percentageDone}%`}</div></div>}

      <h2 className="display-4 fw-bold text-primary">⏳ {minutes}:{seconds < 10 ? "0" : ""}{seconds}</h2>

      {outputPreview && !loading && (
        <div className="text-center">
          <h3>Preview:</h3>
          <div>Input size: {inputFileSize} MB</div>
          <div>Output size: {outputFileSize} MB</div>
          {conversionType === "gif" ? <img src={outputPreview} alt="GIF" className="img-fluid mb-3" /> : <video src={outputPreview} controls className="img-fluid mb-3" />}
          <button onClick={handleDownload} className="btn btn-success">Download</button>
        </div>
      )}
    </div>
  );
};

export default Compress;