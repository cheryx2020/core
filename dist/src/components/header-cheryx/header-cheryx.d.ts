export default HeaderCherxy;
declare function HeaderCherxy({ isAdmin, isEdit, url, showNavigator, Link, mainImageUrl, MenuData, onMenuDataChange, styles: wrapperStyle, socialLinks, socialLinksStyles }: {
    isAdmin: any;
    isEdit: any;
    url: any;
    showNavigator?: boolean | undefined;
    Link: any;
    mainImageUrl?: string | undefined;
    MenuData?: {
        text: string;
        url: string;
    }[] | undefined;
    onMenuDataChange?: (() => void) | undefined;
    styles?: {} | undefined;
    socialLinks: any;
    socialLinksStyles?: {} | undefined;
}): React.JSX.Element;
import React from 'react';
