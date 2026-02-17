export default Compress;
declare function Compress({ FFmpeg, fetchFile, coreURL, wasmURL, type, defaultOptions, showOptionsPanel, onOptionsChange, onCommandPreview, presets, }: {
    FFmpeg: any;
    fetchFile: any;
    coreURL: any;
    wasmURL: any;
    type?: string;
    defaultOptions?: {};
    showOptionsPanel?: boolean;
    onOptionsChange: any;
    onCommandPreview: any;
    presets?: any;
}): React.JSX.Element;
declare namespace Compress {
    export { COMPRESS_TYPE as CompressType };
}
import React from "react";
declare namespace COMPRESS_TYPE {
    let COMPRESS: string;
    let GIF: string;
    let CONVERT: string;
    let AUDIO: string;
    let CUSTOM: string;
}
