export default PostVideo;
declare function PostVideo({ text, url, onChange, onChangeText, onDragStart }: {
    text: any;
    url?: string;
    onChange?: () => void;
    onChangeText?: () => void;
    onDragStart?: () => void;
}): React.JSX.Element;
import React from 'react';
