export default ImageUploadable;
declare function ImageUploadable({ src, alt, onChangeImage, isEdit, wrapperStyle, skipCheckFileSize, imgStyle, className, onChangeStyle, resizeable }: {
    src: any;
    alt: any;
    onChangeImage?: (() => void) | undefined;
    isEdit: any;
    wrapperStyle?: {} | undefined;
    skipCheckFileSize: any;
    imgStyle?: {} | undefined;
    className?: string | undefined;
    onChangeStyle?: (() => void) | undefined;
    resizeable?: boolean | undefined;
}): React.JSX.Element;
import React from 'react';
