export function EmailSubscriptionSuccess(): React.JSX.Element;
export function DownloadPatternForm({ useDispatch, patternId, setIsSubmitted }: {
    useDispatch?: (() => void) | undefined;
    patternId: any;
    setIsSubmitted?: (() => void) | undefined;
}): React.JSX.Element;
export default PatternPreview;
import React from 'react';
declare function PatternPreview({ useDispatch, isAdmin, patternId, isSubscribe, onChange, index, imageUrl: _imageUrl, previewUrl: _previewUrl, buttonText, message }: {
    useDispatch?: (() => void) | undefined;
    isAdmin: any;
    patternId: any;
    isSubscribe: any;
    onChange?: (() => void) | undefined;
    index: any;
    imageUrl: any;
    previewUrl: any;
    buttonText?: string | undefined;
    message?: string | undefined;
}): React.JSX.Element;
