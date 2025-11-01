export function EmailSubscriptionSuccess(): React.JSX.Element;
export function DownloadPatternForm({ useDispatch, patternId, setIsSubmitted }: {
    useDispatch?: () => void;
    patternId: any;
    setIsSubmitted?: () => void;
}): React.JSX.Element;
export default PatternPreview;
import React from 'react';
declare function PatternPreview({ useDispatch, isAdmin, patternId, isSubscribe, onChange, index, imageUrl: _imageUrl, previewUrl: _previewUrl, buttonText, message }: {
    useDispatch?: () => void;
    isAdmin: any;
    patternId: any;
    isSubscribe: any;
    onChange?: () => void;
    index: any;
    imageUrl: any;
    previewUrl: any;
    buttonText?: string;
    message?: string;
}): React.JSX.Element;
