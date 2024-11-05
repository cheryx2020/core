import React, { useState } from "react";
import styles from './AdminMenu.module.scss';

const AdminMenu = ({text, onSaveClick = () => {}, onEditClick = () => {}, onCancelClick = () => {}, onPreviewClick = () => {}}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const onCancelBtnClick = (e) => {
        setIsEdit(false);
        onCancelClick(e);
    }
    const onEditBtnClick = (e) => {
        setIsEdit(true);
        onEditClick(e);
    }
    const onPreviewBtnClick = (e) => {
        setIsEdit(false);
        onPreviewClick(e);
    }
    return <div onClick={() => { setIsShowMenu(!isShowMenu) }} className={`${styles.bigMenu}${isShowMenu ? ' ' + styles.menuActive : ''}`}>
        <span>{text}</span>
        <div onClick={(e) => { e.stopPropagation(); setIsShowMenu(!isShowMenu); isEdit ? onSaveClick(e) : onEditBtnClick(e); }} className={`${styles.btn}${isShowMenu ? ` ${styles.top} ` + styles.show : ''}`}>{isEdit ? 'Save' : 'Edit'}</div>
        {isEdit && <div onClick={(e) => { e.stopPropagation(); setIsShowMenu(!isShowMenu); onCancelBtnClick(); }} className={`${styles.btn}${isShowMenu ? ` ${styles.bottom} ` + styles.show : ''}`}>{'Cancel'}</div>}
        {isEdit && <div onClick={(e) => { e.stopPropagation(); onPreviewBtnClick(e); }} className={`${styles.btn}${isShowMenu ? ` ${styles.left} ` + styles.show : ''}`}>{'👁'}</div>}
    </div>
}
export default AdminMenu;