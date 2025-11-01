export default ImageUpload;
declare function ImageUpload({ url, onChange, caption, onDragStart, onResize, width, height }: {
    url: any;
    onChange?: (() => void) | undefined;
    caption: any;
    onDragStart?: (() => void) | undefined;
    onResize?: (() => void) | undefined;
    width: any;
    height: any;
}): React.JSX.Element;
import React from 'react';
