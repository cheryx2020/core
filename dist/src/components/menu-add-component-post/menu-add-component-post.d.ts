export namespace POST_ITEM_TYPE {
    let TITLE: string;
    let BIG_HEADER: string;
    let MEDIUM_HEADER: string;
    let SMALL_HEADER: string;
    let PARAGRAPH: string;
    let RELATED_TOPIC: string;
    let SUBCRIBE_ME: string;
    let IMAGE: string;
    let BUY_ME_A_COFFEE: string;
    let VIDEO: string;
    let ADS: string;
    let PATTERN: string;
    let PATTERN_PREVIEW: string;
    let GROUP: string;
}
export namespace IMAGE_SUBMENU {
    let ONE_IMAGE: string;
    let TWO_IMAGE: string;
    let THREE_IMAGE: string;
}
export namespace POST_ITEM_TYPE_SUBMENU {
    let IMAGE_1: string[];
    export { IMAGE_1 as IMAGE };
}
export default MenuAddComponentPost;
declare function MenuAddComponentPost({ onClickMenuItem, btnClass, menuItems }: {
    onClickMenuItem?: () => void;
    btnClass?: string;
    menuItems?: string[];
}): React.JSX.Element;
import React from 'react';
