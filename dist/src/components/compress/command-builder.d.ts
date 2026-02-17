/**
 * Assembles the -vf filter chain from options.
 */
export function buildVideoFilters(options: any): any[];
/**
 * Assembles the -af filter chain from options.
 */
export function buildAudioFilters(options: any): any[];
/**
 * Builds a GIF-optimised two-pass argument set.
 *
 * Pass 1 generates a palette, pass 2 uses it for high-quality output.
 * Returns { pass1: string[], pass2: string[] }.
 */
export function buildGifArgs(inputFileName: any, outputFileName: any, options: any): {
    pass1: any[];
    pass2: any[];
    paletteFile: string;
};
/**
 * Main entry point — converts an options object into an FFmpeg args array.
 *
 * For GIF output, use buildGifArgs() instead (two-pass).
 */
export function buildFFmpegArgs(inputFileName: any, outputFileName: any, options: any): any[];
/**
 * Formats an args array as a human-readable command string for preview.
 */
export function formatCommandPreview(args: any): string;
/**
 * Derives the output filename from the input filename and options.
 */
export function getOutputFileName(inputFileName: any, options: any): string;
/**
 * Returns the MIME type for the output format.
 */
export function getOutputMimeType(options: any): any;
