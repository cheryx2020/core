export default TipDetail;
declare function TipDetail({ ProductJsonLd, Link, useDispatch, setIsEdit, useRouter, seo, data, isMobile, isAdmin, isEdit, category, isPatternDetail, theme }: {
    ProductJsonLd: any;
    Link: any;
    useDispatch?: () => void;
    setIsEdit?: () => void;
    useRouter?: () => void;
    seo: any;
    data?: {
        title: string;
        content: any[];
        isPattern: boolean;
        isFree: boolean;
        seoTitle: string;
        seoDescription: string;
    };
    isMobile: any;
    isAdmin: any;
    isEdit: any;
    category: any;
    isPatternDetail: any;
    theme: any;
}): React.JSX.Element;
import React from 'react';
