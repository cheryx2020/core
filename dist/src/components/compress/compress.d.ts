export default Compress;
declare function Compress({ FFmpeg, fetchFile, coreURL, wasmURL, type, }: {
    FFmpeg: any;
    fetchFile: any;
    coreURL: any;
    wasmURL: any;
    type?: string | undefined;
}): React.JSX.Element;
declare namespace Compress {
    export { COMPRESS_TYPE as CompressType };
}
import React from "react";
declare namespace COMPRESS_TYPE {
    let COMPRESS: string;
    let GIF: string;
}
