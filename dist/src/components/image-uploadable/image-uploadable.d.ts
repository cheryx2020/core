export default ImageUploadable;
declare function ImageUploadable({ src, alt, onChangeImage, isEdit, wrapperStyle, skipCheckFileSize, imgStyle, className, onChangeStyle, resizeable }: {
    src: any;
    alt: any;
    onChangeImage?: () => void;
    isEdit: any;
    wrapperStyle?: {};
    skipCheckFileSize: any;
    imgStyle?: {};
    className?: string;
    onChangeStyle?: () => void;
    resizeable?: boolean;
}): React.JSX.Element;
import React from 'react';
