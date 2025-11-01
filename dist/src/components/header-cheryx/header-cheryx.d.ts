export default HeaderCherxy;
declare function HeaderCherxy({ isAdmin, isEdit, url, showNavigator, Link, mainImageUrl, MenuData, onMenuDataChange, styles: wrapperStyle, socialLinks, socialLinksStyles }: {
    isAdmin: any;
    isEdit: any;
    url: any;
    showNavigator?: boolean;
    Link: any;
    mainImageUrl?: string;
    MenuData?: {
        text: string;
        url: string;
    }[];
    onMenuDataChange?: () => void;
    styles?: {};
    socialLinks: any;
    socialLinksStyles?: {};
}): React.JSX.Element;
import React from 'react';
