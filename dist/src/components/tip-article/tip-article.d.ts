export default TipArticle;
declare function TipArticle({ Image, titleStyle, Link, useDispatch, data, isAdmin, onDeletePostSuccess, unoptimized }: {
    Image: any;
    titleStyle?: {};
    Link: any;
    useDispatch?: () => void;
    data: any;
    isAdmin: any;
    onDeletePostSuccess?: () => void;
    unoptimized?: boolean;
}): React.JSX.Element;
import React from 'react';
