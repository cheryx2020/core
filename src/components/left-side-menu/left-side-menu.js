import React from "react";
import { useState } from "react";
import LinksIcon from "../links-icon/links-icon";
import styles from './LeftSideMenu.module.scss';

const LeftSideMenu = ({ menuText = 'Menu', links = [], menuData = [], Link}) => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    return <div onClick={() => { setIsShowMenu(true); document.body.style.overflowY = 'hidden' }} className={styles.hambuger}>
        <img width='22px' height='24px' alt="menu" src="/images/menu.svg"></img>
        <div>{menuText}</div>
        {isShowMenu ? <div onTouchStart={() => { setTimeout(() => setIsShowMenu(false),100);}} className={styles.overlay}>
            <div className={styles.menu} onTouchStart={(e) => { e.stopPropagation() }}>
                <div className={styles.searchInput}>
                    <input className={styles.search}></input>
                    <img alt="Search" className={styles.searchIcon} src="/images/search.svg"></img>
                </div>
                <div className={styles.links}>
                    {links.map((item, index) => <LinksIcon key={index} {...item} />)}
                </div>
                <div className={styles.items}>
                    {menuData.map((item, index) => <Link key={index} href={item.url}><a rel="noreferrer">{item.text}</a></Link>)}
                </div>
            </div>
        </div> : <>{typeof document !== 'undefined' ? (() => {document.body.style.overflowY = 'overlay';})() : ''}</>}
    </div>
}
export default LeftSideMenu;