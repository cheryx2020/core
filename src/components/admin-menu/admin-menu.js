import React, { useEffect, useState } from "react";
import styles from './AdminMenu.module.scss';

const BUTTON_TYPES = {
    EDIT_SAVE: "EDIT_SAVE",
    CANCEL: "CANCEL"
}
const { CANCEL, EDIT_SAVE } = BUTTON_TYPES;
const AdminMenu = ({text, onSaveClick = () => {}, onEditClick = () => {}, onCancelClick = ()=> {}, isEdit, nosave}) => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const onEditBtnClick = (e) => {
        onEditClick(e);
    }
    const onClickButton = (e, type) => {
        e.stopPropagation(); 
        setIsShowMenu(false);
        if (type === EDIT_SAVE) {
            isEdit && !nosave ? onSaveClick(e) : onEditBtnClick(e);
        } else if (type === CANCEL) {
            onCancelClick(e);
        }
    }
    const makeBtnStyle = position => {
        return `${styles.btn}${isShowMenu ? ` ${styles[position]} ` + styles.show : ''}`;
    }
    return <div onClick={() => { setIsShowMenu(!isShowMenu) }} className={`${styles.bigMenu}${isShowMenu ? ' ' + styles.menuActive : ''}`}>
        <span>{text}</span>
        {!isEdit && <div onClick={(e) => { onClickButton(e, EDIT_SAVE); }} className={makeBtnStyle('top')}>Edit</div>}
        {isEdit && !nosave && <div onClick={(e) => { onClickButton(e, EDIT_SAVE); }} className={makeBtnStyle('top')}>Save</div>}
        {isEdit && <div onClick={(e) => { onClickButton(e, CANCEL); }} className={makeBtnStyle('bottom')}>Cancel</div>}
    </div>
}
export default AdminMenu;