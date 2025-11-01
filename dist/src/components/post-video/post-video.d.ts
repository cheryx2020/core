export default PostVideo;
declare function PostVideo({ text, url, onChange, onChangeText, onDragStart }: {
    text: any;
    url?: string | undefined;
    onChange?: (() => void) | undefined;
    onChangeText?: (() => void) | undefined;
    onDragStart?: (() => void) | undefined;
}): React.JSX.Element;
import React from 'react';
