export default ImageUpload;
declare function ImageUpload({ url, onChange, caption, onDragStart, onResize, width, height }: {
    url: any;
    onChange?: () => void;
    caption: any;
    onDragStart?: () => void;
    onResize?: () => void;
    width: any;
    height: any;
}): React.JSX.Element;
import React from 'react';
