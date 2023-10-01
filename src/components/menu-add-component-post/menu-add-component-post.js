import { useState } from 'react';

export const POST_ITEM_TYPE = {
    TITLE: 'title',
    BIG_HEADER: 'big-header',
    MEDIUM_HEADER: 'medium-header',
    SMALL_HEADER: 'small-header',
    PARAGRAPH: 'paragraph',
    RELATED_TOPIC: 'related-topic',
    SUBCRIBE_ME: 'subcribe-me',
    IMAGE: 'image',
    BUY_ME_A_COFFEE: 'buy-me-a-coffee',
    VIDEO: 'video',
    ADS: 'ads',
    PATTERN: 'pattern',
    PATTERN_PREVIEW: 'pattern_preview',
    GROUP: 'group'
}
export const IMAGE_SUBMENU = {
    ONE_IMAGE: 'image',
    TWO_IMAGE: 'two_image',
    THREE_IMAGE: 'three_image',
}
export const POST_ITEM_TYPE_SUBMENU = {
    IMAGE: [
        IMAGE_SUBMENU.ONE_IMAGE,
        IMAGE_SUBMENU.TWO_IMAGE,
        IMAGE_SUBMENU.THREE_IMAGE
    ],

}

import styles from './MenuAddComponentPost.module.scss'
const MenuAddComponentPost = ({ onClickMenuItem = () => {}, btnClass='', menuItems = [] }) => {
    const [hoverItem, setHoverItem] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const onMenuMouseOver = (item) => {
        setHoverItem(item);
    }
    const hasSubMenu = (item) => {
        return Array.isArray(POST_ITEM_TYPE_SUBMENU[item]);
    }
    return <div className={`${styles.adminMenuBtn}${btnClass ? ' ' + btnClass : ''}`} onClick={() => { setShowMenu(!showMenu) }}>
        {showMenu ? 'X' : 'Add'}
        <div style={{ position: 'relative' }}>
          <div className={styles.adminMenu + ` ${!showMenu ? styles.hidden : ''}`}>
            {Array.isArray(Object.keys(menuItems)) && menuItems.map((item, index) => <div onMouseOver={() => onMenuMouseOver(item)} className={styles.menuItem} key={index} onClick={(e) => { e.stopPropagation(); !hasSubMenu(item) && onClickMenuItem(POST_ITEM_TYPE[item]); setShowMenu(false) }}>
                {item}
                {hasSubMenu(item) && hoverItem === item && <div className={`${styles.adminMenu} ${styles.subMenu}`}>
                    {POST_ITEM_TYPE_SUBMENU[item].map((i,idx) => <div onClick={e => { e.stopPropagation(); onClickMenuItem(i); setShowMenu(false);}} className={styles.menuItem} key={idx}>{i}</div>)}
                </div>}
            </div>)}
          </div>
        </div>
    </div>
}
export default MenuAddComponentPost;