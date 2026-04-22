import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

// Mock gtag globally
beforeAll(() => {
  window.gtag = jest.fn();
  window.URL.createObjectURL = jest.fn(() => "blob:mock-url");
  window.URL.revokeObjectURL = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
  window.gtag.mockClear();
  window.URL.createObjectURL.mockClear();
  window.URL.revokeObjectURL.mockClear();
});

// --- Helpers ---

const createMockFile = (name = "video.mp4", size = 1024, type = "video/mp4") => {
  const file = new File(["x".repeat(size)], name, { type });
  Object.defineProperty(file, "size", { value: size });
  return file;
};

const createMockFFmpeg = (overrides = {}) => {
  const handlers = {};
  return {
    load: jest.fn().mockResolvedValue(undefined),
    on: jest.fn((event, cb) => {
      handlers[event] = cb;
    }),
    writeFile: jest.fn().mockResolvedValue(undefined),
    exec: jest.fn().mockResolvedValue(undefined),
    readFile: jest.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
    terminate: jest.fn().mockResolvedValue(undefined),
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

// Dynamic import to allow gtag mock to be set up first
let Compress;
beforeAll(async () => {
  const mod = await import("../src/components/compress/compress.js");
  Compress = mod.default;
});

// --- Tests ---

describe("Compress component", () => {
  describe("Rendering", () => {
    it("renders with default compress type title and description", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      expect(screen.getByText("Compress Video")).toBeInTheDocument();
      expect(
        screen.getByText("Reduce the file size while maximizing video quality.")
      ).toBeInTheDocument();
    });

    it("renders with GIF type title and description", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} type="gif" />);
      expect(screen.getByText("Convert Video to GIF")).toBeInTheDocument();
      expect(
        screen.getByText("Convert your video to GIF format.")
      ).toBeInTheDocument();
    });

    it("renders a file input that accepts video/*", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("accept", "video/*");
    });

    it("does not show error, progress, or output on initial render", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      expect(screen.queryByText("Download")).not.toBeInTheDocument();
    });
  });

  describe("File validation", () => {
    it("shows error for non-video file", async () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("doc.pdf", 1024, "application/pdf");

      fireEvent.change(input, { target: { files: [file] } });

      expect(
        screen.getByText("Invalid file type. Please select a video file.")
      ).toBeInTheDocument();
    });

    it("shows error for oversized file", async () => {
      const ffmpeg = createMockFFmpeg();
      const maxSize = 1024 * 1024; // 1 MB
      render(<Compress {...defaultProps(ffmpeg)} maxFileSize={maxSize} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("big.mp4", maxSize + 1, "video/mp4");

      fireEvent.change(input, { target: { files: [file] } });

      expect(
        screen.getByText("File is too large. Maximum allowed size is 1 MB.")
      ).toBeInTheDocument();
    });

    it("clears file input after validation error", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} maxFileSize={100} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("big.mp4", 200, "video/mp4");

      fireEvent.change(input, { target: { files: [file] } });

      // input value should be cleared
      expect(input.value).toBe("");
    });

    it("logs analytics event on validation error", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} maxFileSize={100} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("big.mp4", 200, "video/mp4");

      fireEvent.change(input, { target: { files: [file] } });

      expect(window.gtag).toHaveBeenCalledWith(
        "event",
        "compress_validation_error",
        expect.objectContaining({
          event_category: "Compress Result",
        })
      );
    });

    it("dismisses error message when close button is clicked", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} maxFileSize={100} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("big.mp4", 200, "video/mp4");

      fireEvent.change(input, { target: { files: [file] } });
      expect(screen.getByRole("alert")).toBeInTheDocument();

      const closeBtn = screen.getByLabelText("Close");
      fireEvent.click(closeBtn);
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("Video compression", () => {
    it("loads FFmpeg and compresses a valid video file", async () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");

      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });

      await waitFor(() => {
        expect(ffmpeg.load).toHaveBeenCalled();
        expect(ffmpeg.writeFile).toHaveBeenCalledWith("test.mp4", expect.any(Uint8Array));
        expect(ffmpeg.exec).toHaveBeenCalledWith(
          expect.arrayContaining(["-i", "test.mp4", "-vcodec", "libx264"])
        );
      });
    });

    it("creates output with correct filename for compress type", async () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");

      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });

      await waitFor(() => {
        expect(ffmpeg.exec).toHaveBeenCalledWith(
          expect.arrayContaining(["test_compressed.mov"])
        );
      });
    });

    it("handles filename with multiple dots correctly", async () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("my.vacation.video.mp4", 5000, "video/mp4");

      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });

      await waitFor(() => {
        expect(ffmpeg.exec).toHaveBeenCalledWith(
          expect.arrayContaining(["my.vacation.video_compressed.mov"])
        );
      });
    });

    it("shows download button after successful compression", async () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");

      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });

      await waitFor(() => {
        expect(
          screen.getByText("Download Compressed Video")
        ).toBeInTheDocument();
      });
    });

    it("logs success analytics event", async () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
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
          })
        );
      });
    });
  });

  describe("GIF conversion", () => {
    it("converts video to GIF with correct ffmpeg args", async () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} type="gif" />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("clip.mp4", 3000, "video/mp4");

      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });

      await waitFor(() => {
        expect(ffmpeg.exec).toHaveBeenCalledWith([
          "-i",
          "clip.mp4",
          "-vf",
          "fps=10",
          "clip.gif",
        ]);
      });
    });

    it("shows Download GIF button after conversion", async () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} type="gif" />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("clip.mp4", 3000, "video/mp4");

      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });

      await waitFor(() => {
        expect(screen.getByText("Download GIF")).toBeInTheDocument();
      });
    });
  });

  describe("Error handling", () => {
    it("shows error message when FFmpeg fails", async () => {
      const ffmpeg = createMockFFmpeg({
        exec: jest.fn().mockRejectedValue(new Error("FFmpeg crashed")),
      });
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");

      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });

      await waitFor(() => {
        expect(screen.getByText("FFmpeg crashed")).toBeInTheDocument();
      });
    });

    it("shows fallback error message when error has no message", async () => {
      const ffmpeg = createMockFFmpeg({
        exec: jest.fn().mockRejectedValue({}),
      });
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");

      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });

      await waitFor(() => {
        expect(
          screen.getByText(
            "An error occurred during processing. Please try again."
          )
        ).toBeInTheDocument();
      });
    });

    it("logs error analytics event on failure", async () => {
      const ffmpeg = createMockFFmpeg({
        exec: jest.fn().mockRejectedValue(new Error("fail")),
      });
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
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
          })
        );
      });
    });
  });

  describe("Cancel", () => {
    it("terminates FFmpeg and resets state when cancel is clicked", async () => {
      let resolveExec;
      const execPromise = new Promise((resolve) => {
        resolveExec = resolve;
      });
      const ffmpeg = createMockFFmpeg({
        exec: jest.fn(() => execPromise),
      });

      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");

      // Start compression (will hang on exec)
      act(() => {
        fireEvent.change(input, { target: { files: [file] } });
      });

      // Wait for loading state
      await waitFor(() => {
        expect(screen.getByText("Cancel")).toBeInTheDocument();
      });

      // Click cancel
      await act(async () => {
        fireEvent.click(screen.getByText("Cancel"));
      });

      expect(ffmpeg.terminate).toHaveBeenCalled();

      // Resolve the hanging exec to avoid unhandled rejection
      resolveExec();
    });
  });

  describe("Download", () => {
    it("triggers download with correct filename for compressed video", async () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");

      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });

      const clickSpy = jest.fn();
      jest.spyOn(document, "createElement").mockImplementation((tag) => {
        if (tag === "a") {
          const el = { click: clickSpy, href: "", download: "" };
          return el;
        }
        return document.createElement.wrappedMethod
          ? document.createElement.wrappedMethod(tag)
          : Object.getPrototypeOf(document).createElement.call(document, tag);
      });

      await waitFor(() => {
        expect(
          screen.getByText("Download Compressed Video")
        ).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Download Compressed Video"));

      expect(window.gtag).toHaveBeenCalledWith(
        "event",
        "click",
        expect.objectContaining({
          event_category: "Download Result",
        })
      );
    });
  });

  describe("Reset", () => {
    it("revokes blob URL and clears output on reset", async () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");

      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });

      await waitFor(() => {
        expect(screen.getByText("Reset")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Reset"));

      expect(window.URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
      expect(
        screen.queryByText("Download Compressed Video")
      ).not.toBeInTheDocument();
    });
  });

  describe("CompressType static property", () => {
    it("exposes CompressType on the component", () => {
      expect(Compress.CompressType).toEqual({
        COMPRESS: "compress",
        GIF: "gif",
      });
    });
  });

  describe("No file selected", () => {
    it("does nothing when no file is selected", () => {
      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');

      fireEvent.change(input, { target: { files: [] } });

      expect(ffmpeg.load).not.toHaveBeenCalled();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("gtag not available", () => {
    it("does not throw when gtag is not a function", async () => {
      const originalGtag = window.gtag;
      window.gtag = undefined;

      const ffmpeg = createMockFFmpeg();
      render(<Compress {...defaultProps(ffmpeg)} />);
      const input = document.querySelector('input[type="file"]');
      const file = createMockFile("test.mp4", 5000, "video/mp4");

      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });

      // Should not throw - component should handle missing gtag gracefully
      await waitFor(() => {
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      });

      window.gtag = originalGtag;
    });
  });
});
