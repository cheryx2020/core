export default TipArticle;
declare function TipArticle({ Image, titleStyle, Link, useDispatch, data, isAdmin, onDeletePostSuccess, unoptimized }: {
    Image: any;
    titleStyle?: {} | undefined;
    Link: any;
    useDispatch?: (() => void) | undefined;
    data: any;
    isAdmin: any;
    onDeletePostSuccess?: (() => void) | undefined;
    unoptimized?: boolean | undefined;
}): React.JSX.Element;
import React from 'react';
