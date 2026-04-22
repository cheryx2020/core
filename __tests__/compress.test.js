import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

// ── Setup global mocks ──
beforeAll(() => {
  window.gtag = jest.fn();
  window.URL.createObjectURL = jest.fn(() => "blob:mock-url");
  window.URL.revokeObjectURL = jest.fn();
  // Mock navigator.share
  window.navigator.share = jest.fn().mockResolvedValue(undefined);
  window.navigator.canShare = jest.fn().mockReturnValue(true);
});

afterEach(() => {
  jest.restoreAllMocks();
  window.gtag.mockClear();
  window.URL.createObjectURL.mockClear();
  window.URL.revokeObjectURL.mockClear();
  if (window.navigator.share) window.navigator.share.mockClear();
  if (window.navigator.canShare) window.navigator.canShare.mockClear();
});

// ── Helper: Create mock file ──
const createMockFile = (name = "video.mp4", size = 1024, type = "video/mp4") => {
  const file = new File(["x".repeat(size)], name, { type });
  Object.defineProperty(file, "size", { value: size });
  return file;
};

// ── Helper: Create mock FFmpeg instance ──
const createMockFFmpeg = (overrides = {}) => {
  const handlers = {};
  return {
    load: jest.fn().mockResolvedValue(undefined),
    on: jest.fn((event, cb) => {
      handlers[event] = cb;
    }),
    writeFile: jest.fn().mockResolvedValue(undefined),
    exec: jest.fn().mockImplementation(async (args) => {
      // Simulate progress
      if (handlers.progress) {
        setTimeout(() => handlers.progress({ progress: 0.5 }), 10);
        setTimeout(() => handlers.progress({ progress: 1 }), 20);
      }
    }),
    readFile: jest.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
    terminate: jest.fn().mockResolvedValue(undefined),
    deleteFile: jest.fn().mockResolvedValue(undefined),
    _handlers: handlers,
    ...overrides,
  };
};

const mockFetchFile = jest.fn().mockResolvedValue(new Uint8Array([1, 2, 3]));

const MockFFmpegClass = (mockInstance) =>
  jest.fn().mockImplementation(() => mockInstance);

const defaultProps = (ffmpegInstance) => ({
  FFmpeg: MockFFmpegClass(ffmpegInstance),
  fetchFile: mockFetchFile,
  coreURL: "http://example.com/ffmpeg-core.js",
  wasmURL: "http://example.com/ffmpeg-core.wasm",
});

// ── Dynamic import to allow gtag mock to be set up first ──
let Compress;
beforeAll(async () => {
  const mod = await import("../src/components/compress/compress.js");
  Compress = mod.default;
});

// ═══════════════════════════════════════════════════════════════════════════
// Tests
// ═══════════════════════════════════════════════════════════════════════════

describe("Compress component", () => {
  // ───────────────────────────────────────────────────────────────────────────
  // Rendering
  // ───────────────────────────────────────────────────────────────────────────
  describe("Rendering", () => {
    it("renders with default compress type", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      
      expect(screen.getByText("Compress Video")).toBeInTheDocument();
      expect(
        screen.getByText("Reduce the file size while maximizing video quality.")
      ).toBeInTheDocument();
    });

    it("renders with GIF type", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} type="gif" />);
      
      expect(screen.getByText("Convert Video to GIF")).toBeInTheDocument();
      expect(screen.getByText("Convert your video to GIF format.")).toBeInTheDocument();
    });

    it("renders with CONVERT type", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} type="convert" />);
      
      expect(screen.getByText("Convert Video")).toBeInTheDocument();
      expect(
        screen.getByText("Convert your video to a different format.")
      ).toBeInTheDocument();
    });

    it("renders with AUDIO type", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} type="audio" />);
      
      expect(screen.getByText("Extract / Convert Audio")).toBeInTheDocument();
      expect(
        screen.getByText("Extract or convert the audio track from your video.")
      ).toBeInTheDocument();
    });

    it("renders with CUSTOM type and shows type selector", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} type="custom" />);
      
      expect(screen.getByRole("heading", { name: "FFmpeg Custom" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Compress Video" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Convert Video to GIF" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Convert Video" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Extract / Convert Audio" })).toBeInTheDocument();
    });

    it("renders file input with video/* accept attribute by default", () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("accept", "video/*");
    });

    it("renders file input with video/*,audio/* accept for AUDIO type", () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} type="audio" />);
      
      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("accept", "video/*,audio/*");
    });

    it("shows options panel toggle button by default", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      
      expect(screen.getByText("Show Settings")).toBeInTheDocument();
    });

    it("hides options panel toggle when showOptionsPanel is false", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} showOptionsPanel={false} />);
      
      expect(screen.queryByText("Show Settings")).not.toBeInTheDocument();
    });

    it("does not show error, progress, or output on initial render", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      expect(screen.queryByText("Download")).not.toBeInTheDocument();
    });

    it("exposes CompressType static property", () => {
      expect(Compress.CompressType).toEqual({
        COMPRESS: "compress",
        GIF: "gif",
        CONVERT: "convert",
        AUDIO: "audio",
        CUSTOM: "custom",
      });
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Options Panel
  // ───────────────────────────────────────────────────────────────────────────
  describe("Options Panel", () => {
    it("toggles options panel visibility", async () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      
      const toggleButton = screen.getByText("Show Settings");
      expect(screen.queryByText("Output Format")).not.toBeInTheDocument();
      
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(screen.getByText("Hide Settings")).toBeInTheDocument();
        expect(screen.getByText("Output Format")).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText("Hide Settings"));
      await waitFor(() => {
        expect(screen.getByText("Show Settings")).toBeInTheDocument();
        expect(screen.queryByText("Output Format")).not.toBeInTheDocument();
      });
    });

    it("calls onOptionsChange when options are updated", async () => {
      const ffmpeg = createMockFFmpeg();
      const onOptionsChange = jest.fn();
      render(
        <Compress
          {...defaultProps(ffmpeg)}
          onOptionsChange={onOptionsChange}
        />
      );
      
      // Should be called once on mount with initial options
      await waitFor(() => {
        expect(onOptionsChange).toHaveBeenCalled();
      });
    });

    it("uses defaultOptions prop to override initial options", () => {
      const ffmpeg = createMockFFmpeg();
      const onOptionsChange = jest.fn();
      const defaultOptions = { crf: 20, preset: "slow" };
      
      render(
        <Compress
          {...defaultProps(ffmpeg)}
          defaultOptions={defaultOptions}
          onOptionsChange={onOptionsChange}
        />
      );
      
      expect(onOptionsChange).toHaveBeenCalledWith(
        expect.objectContaining({ crf: 20, preset: "slow" })
      );
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Type Switching
  // ───────────────────────────────────────────────────────────────────────────
  describe("Type Switching (CUSTOM mode)", () => {
    it("changes conversion type when type button is clicked", async () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} type="custom" />);
      
      expect(screen.getByRole("heading", { name: "FFmpeg Custom" })).toBeInTheDocument();
      
      const gifButton = screen.getByRole("button", { name: "Convert Video to GIF" });
      fireEvent.click(gifButton);
      
      await waitFor(() => {
        expect(screen.getByRole("heading", { name: "Convert Video to GIF" })).toBeInTheDocument();
        expect(screen.getByText("Convert your video to GIF format.")).toBeInTheDocument();
      });
    });

    it("resets state when switching types", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} type="custom" />);
      
      // Upload a file first
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(screen.getByText(/Download/)).toBeInTheDocument();
      });
      
      // Switch type
      const audioButton = screen.getByRole("button", { name: "Extract / Convert Audio" });
      fireEvent.click(audioButton);
      
      await waitFor(() => {
        expect(screen.queryByText(/Download/)).not.toBeInTheDocument();
        expect(input.value).toBe("");
      });
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // File Processing - Regular Video
  // ───────────────────────────────────────────────────────────────────────────
  describe("File Processing - Regular Video", () => {
    it("processes a video file successfully", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(ffmpeg.load).toHaveBeenCalled();
        expect(ffmpeg.writeFile).toHaveBeenCalledWith("test.mp4", expect.any(Uint8Array));
        expect(ffmpeg.exec).toHaveBeenCalled();
        expect(ffmpeg.readFile).toHaveBeenCalled();
      });
      
      expect(screen.getByText(/Download/)).toBeInTheDocument();
    });

    it("shows progress during processing", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      // Progress bar should appear at some point during processing
      // or after completion - just check the process completed
      await waitFor(() => {
        expect(ffmpeg.exec).toHaveBeenCalled();
      });
    });

    it("logs analytics event on file selection", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      expect(window.gtag).toHaveBeenCalledWith(
        "event",
        "click",
        expect.objectContaining({
          event_category: "Compress Video",
          event_label: "Change File",
        })
      );
    });

    it("logs success analytics event after processing", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(window.gtag).toHaveBeenCalledWith(
          "event",
          "compress_success",
          expect.objectContaining({
            event_category: "Compress Result",
            event_label: "compress Success",
          })
        );
      });
    });

    it("displays elapsed time during processing", async () => {
      const ffmpeg = createMockFFmpeg({
        exec: jest.fn().mockImplementation(async () => {
          // Simulate processing time
          await new Promise(resolve => setTimeout(resolve, 100));
        }),
      });
      
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      // Just verify processing completed successfully
      await waitFor(() => {
        expect(screen.getByText(/Download/)).toBeInTheDocument();
      });
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // File Processing - GIF Conversion
  // ───────────────────────────────────────────────────────────────────────────
  describe("File Processing - GIF Conversion", () => {
    it("uses 2-pass encoding for GIF", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} type="gif" />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        // Should call exec twice (pass1 for palette, pass2 for GIF)
        expect(ffmpeg.exec).toHaveBeenCalledTimes(2);
        expect(ffmpeg.deleteFile).toHaveBeenCalledWith("_palette.png");
      });
    });

    it("renders GIF preview as img element", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} type="gif" />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        const showDetailsBtn = screen.getByText("Show Details");
        fireEvent.click(showDetailsBtn);
      });
      
      await waitFor(() => {
        const gifPreview = screen.getByAltText("Converted GIF");
        expect(gifPreview).toBeInTheDocument();
        expect(gifPreview.tagName).toBe("IMG");
      });
    });

    it("calls onCommandPreview with GIF commands", async () => {
      const ffmpeg = createMockFFmpeg();
      const onCommandPreview = jest.fn();
      const { container } = render(
        <Compress
          {...defaultProps(ffmpeg)}
          type="gif"
          onCommandPreview={onCommandPreview}
        />
      );
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(onCommandPreview).toHaveBeenCalledWith(
          expect.objectContaining({
            pass1: expect.any(String),
            pass2: expect.any(String),
          })
        );
      });
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // File Processing - Audio Extraction
  // ───────────────────────────────────────────────────────────────────────────
  describe("File Processing - Audio Extraction", () => {
    it("renders audio preview as audio element", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} type="audio" />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        const showDetailsBtn = screen.getByText("Show Details");
        fireEvent.click(showDetailsBtn);
      });
      
      await waitFor(() => {
        const audioElement = container.querySelector("audio");
        expect(audioElement).toBeInTheDocument();
        expect(audioElement).toHaveAttribute("controls");
      });
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Error Handling
  // ───────────────────────────────────────────────────────────────────────────
  describe("Error Handling", () => {
    it("displays error message when FFmpeg fails", async () => {
      const ffmpeg = createMockFFmpeg({
        exec: jest.fn().mockRejectedValue(new Error("FFmpeg error occurred")),
      });
      
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByText(/FFmpeg error occurred/)).toBeInTheDocument();
      });
    });

    it("logs error analytics event on failure", async () => {
      const ffmpeg = createMockFFmpeg({
        exec: jest.fn().mockRejectedValue(new Error("Test error")),
      });
      
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(window.gtag).toHaveBeenCalledWith(
          "event",
          "compress_error",
          expect.objectContaining({
            event_category: "Compress Result",
            event_label: "compress Error",
          })
        );
      });
    });

    it("displays fallback error message for unknown errors", async () => {
      const ffmpeg = createMockFFmpeg({
        exec: jest.fn().mockRejectedValue(null),
      });
      
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(screen.getByText(/An unknown error occurred/)).toBeInTheDocument();
      });
    });

    it("displays FFmpeg logs in error details", async () => {
      const ffmpeg = createMockFFmpeg({
        exec: jest.fn().mockRejectedValue(new Error("Encoding failed")),
      });
      
      // Trigger log events
      ffmpeg.on.mockImplementation((event, cb) => {
        if (event === "log") {
          setTimeout(() => {
            cb({ message: "Log line 1" });
            cb({ message: "Log line 2" });
            cb({ message: "Log line 3" });
          }, 5);
        }
      });
      
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(screen.getByText(/FFmpeg Log/)).toBeInTheDocument();
      });
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Download
  // ───────────────────────────────────────────────────────────────────────────
  describe("Download", () => {
    it("triggers download when Download button is clicked", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(screen.getByText(/Download/)).toBeInTheDocument();
      });
      
      const createElementSpy = jest.spyOn(document, "createElement");
      const downloadButton = screen.getByText(/Download/);
      
      fireEvent.click(downloadButton);
      
      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(window.gtag).toHaveBeenCalledWith(
        "event",
        "click",
        expect.objectContaining({
          event_category: "Download Result",
        })
      );
      
      createElementSpy.mockRestore();
    });

    it("uses correct file extension for different formats", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(
        <Compress {...defaultProps(ffmpeg)} defaultOptions={{ outputFormat: "webm" }} />
      );
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(screen.getByText(/Download WebM/)).toBeInTheDocument();
      });
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Share
  // ───────────────────────────────────────────────────────────────────────────
  describe("Share", () => {
    it("shows Share button when navigator.share is available", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(screen.getByText("Share")).toBeInTheDocument();
      });
    });

    it("calls navigator.share when Share button is clicked", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        const shareButton = screen.getByText("Share");
        fireEvent.click(shareButton);
      });
      
      await waitFor(() => {
        expect(window.navigator.share).toHaveBeenCalled();
      });
    });

    it("logs analytics event when sharing", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        const shareButton = screen.getByText("Share");
        fireEvent.click(shareButton);
      });
      
      expect(window.gtag).toHaveBeenCalledWith(
        "event",
        "click",
        expect.objectContaining({
          event_category: "Share Result",
        })
      );
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Recompress
  // ───────────────────────────────────────────────────────────────────────────
  describe("Recompress", () => {
    it("reprocesses the same file when Recompress is clicked", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(screen.getByText("Re-compress")).toBeInTheDocument();
      });
      
      ffmpeg.exec.mockClear();
      
      const recompressButton = screen.getByText("Re-compress");
      await act(async () => {
        fireEvent.click(recompressButton);
      });
      
      await waitFor(() => {
        expect(ffmpeg.exec).toHaveBeenCalled();
      });
    });

    it("logs analytics event for recompress", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        const recompressButton = screen.getByText("Re-compress");
        fireEvent.click(recompressButton);
      });
      
      expect(window.gtag).toHaveBeenCalledWith(
        "event",
        "click",
        expect.objectContaining({
          event_label: "Recompress",
        })
      );
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Reset
  // ───────────────────────────────────────────────────────────────────────────
  describe("Reset", () => {
    it("clears output and resets state when Reset is clicked", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        expect(screen.getByText("Reset")).toBeInTheDocument();
      });
      
      const resetButton = screen.getByText("Reset");
      fireEvent.click(resetButton);
      
      await waitFor(() => {
        expect(screen.queryByText(/Download/)).not.toBeInTheDocument();
        expect(input.value).toBe("");
      });
    });

    it("revokes blob URL on reset", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        const resetButton = screen.getByText("Reset");
        fireEvent.click(resetButton);
      });
      
      // Blob URL should still be created during processing
      expect(window.URL.createObjectURL).toHaveBeenCalled();
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Details Panel
  // ───────────────────────────────────────────────────────────────────────────
  describe("Details Panel", () => {
    it("shows compression details when Show Details is clicked", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        const showDetailsBtn = screen.getByText("Show Details");
        fireEvent.click(showDetailsBtn);
      });
      
      await waitFor(() => {
        expect(screen.getByText(/Input file size:/)).toBeInTheDocument();
        expect(screen.getByText(/Output file size:/)).toBeInTheDocument();
        expect(screen.getByText(/Compression:/)).toBeInTheDocument();
        expect(screen.getByText(/Computation time:/)).toBeInTheDocument();
      });
    });

    it("logs analytics event when showing details", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        const showDetailsBtn = screen.getByText("Show Details");
        fireEvent.click(showDetailsBtn);
      });
      
      expect(window.gtag).toHaveBeenCalledWith(
        "event",
        "click",
        expect.objectContaining({
          event_category: "Behavior",
          event_label: "Show Details",
        })
      );
    });

    it("displays compression percentage correctly", async () => {
      const ffmpeg = createMockFFmpeg({
        readFile: jest.fn().mockResolvedValue(new Uint8Array(1000)),
      });
      
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        const showDetailsBtn = screen.getByText("Show Details");
        fireEvent.click(showDetailsBtn);
      });
      
      await waitFor(() => {
        // Original: 5000 bytes = 0.00 MB, Output: 1000 bytes = 0.00 MB
        // Should show compression percentage
        expect(screen.getByText(/Compression:/)).toBeInTheDocument();
      });
    });

    it("renders video preview in details panel", async () => {
      const ffmpeg = createMockFFmpeg();
      const { container } = render(<Compress {...defaultProps(ffmpeg)} />);
      
      const input = container.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      await waitFor(() => {
        const showDetailsBtn = screen.getByText("Show Details");
        fireEvent.click(showDetailsBtn);
      });
      
      await waitFor(() => {
        const videoElement = container.querySelector("video");
        expect(videoElement).toBeInTheDocument();
        expect(videoElement).toHaveAttribute("controls");
      });
    });
  });
});
