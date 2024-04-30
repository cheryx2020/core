import React, { useEffect, useState } from "react";
import styles from './AdminMenu.module.scss';

const AdminMenu = ({isEdit, text, onSaveClick = () => {}, onEditClick = () => {}, onCancelClick = () => {}, onPreviewClick = () => {}, hideButtons = [] }) => {
    const [_isEdit, setIsEdit] = useState(isEdit);
    const [isShowMenu, setIsShowMenu] = useState(false);
    useEffect(() => {
        setIsEdit(isEdit);
    },[isEdit]);
    return <div onClick={() => { setIsShowMenu(!isShowMenu) }} className={`${styles.bigMenu}${isShowMenu ? ' ' + styles.menuActive : ''}`}>
        <span>{text}</span>
        {!hideButtons.includes('edit-save') && <div onClick={(e) => { e.stopPropagation(); setIsShowMenu(!isShowMenu); _isEdit ? onSaveClick(e) : onEditClick(e); }} className={`${styles.btn}${isShowMenu ? ` ${styles.top} ` + styles.show : ''}`}>{_isEdit ? 'Save' : 'Edit'}</div>}
        {_isEdit && <div onClick={(e) => { e.stopPropagation(); setIsShowMenu(!isShowMenu); onCancelClick(); }} className={`${styles.btn}${isShowMenu ? ` ${styles.bottom} ` + styles.show : ''}`}>{'Cancel'}</div>}
        {_isEdit && !hideButtons.includes('preview') && <div onClick={(e) => { e.stopPropagation(); onPreviewClick(); }} className={`${styles.btn}${isShowMenu ? ` ${styles.left} ` + styles.show : ''}`}>{'👁'}</div>}
    </div>
}
export default AdminMenu;