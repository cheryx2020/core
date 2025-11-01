export function getSelectionText(): string;
export function PostContent({ useDispatch, data, onChangeData, onSaveClick, onCancelClick, isMobile, isEdit, setIsEdit, isShowBigMenu, menuBtnClass, theme }: {
    useDispatch?: () => void;
    data?: any[];
    onChangeData?: () => void;
    onSaveClick?: () => void;
    onCancelClick?: () => void;
    isMobile: any;
    isEdit: any;
    setIsEdit?: () => void;
    isShowBigMenu?: boolean;
    menuBtnClass?: string;
    theme: any;
}): React.JSX.Element;
export function ImageConfig({ title, value, onChange }: {
    title: any;
    value: any;
    onChange?: () => void;
}): React.JSX.Element;
export function MultiImageConfig({ data, onChange }: {
    data: any;
    onChange: any;
}): React.JSX.Element;
export const noImageUrl: "/images/no-image.png";
export function getPostId(titleData: any): string;
export function onDragStart(e: any): void;
export function makeContentDataOnDrop(e: any, contentData: any): any;
export function onDragOver(e: any): void;
export function onDragLeave(e: any): void;
export function getContentByType(type: any, textDefault: string, currentIndex: number, contentData: any): any[];
export function onDrop(e: any, contentData: any): any[];
export function onChangeImageMultiple({ imgIndex, data, style }: {
    imgIndex: any;
    data: any;
    style: any;
}, index: any, key: any, contentData: any): any[];
export function onImageResize(size: any, index: any, contentData: any): any[];
export function onChangePatternPreview(e: any, index: any, key: any, contentData: any): any[];
export function onChangePatternDetail(e: any, index: any, key: any, contentData: any): any[];
export function onChangeGroupDetail(e: any, index: any, key: any, contentData: any): any[];
export function onCaptionChange(e: any, index: any, contentData: any): any[];
import React from "react";
