import React, { useEffect, useState } from "react";
import styles from './AdminMenu.module.scss';

const AdminMenu = ({text, onSaveClick = () => {}, onEditClick = () => {}, isEdit: _isEdit}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isShowMenu, setIsShowMenu] = useState(false);
    useEffect(() => {
        setIsEdit(_isEdit);
    }, [_isEdit])
    const onEditBtnClick = (e) => {
        setIsEdit(true);
        onEditClick(e);
    }
    return <div onClick={() => { setIsShowMenu(!isShowMenu) }} className={`${styles.bigMenu}${isShowMenu ? ' ' + styles.menuActive : ''}`}>
        <span>{text}</span>
        <div onClick={(e) => { e.stopPropagation(); setIsShowMenu(!isShowMenu); isEdit ? onSaveClick(e) : onEditBtnClick(e); }} className={`${styles.btn}${isShowMenu ? ` ${styles.top} ` + styles.show : ''}`}>{isEdit ? 'Save' : 'Edit'}</div>
    </div>
}
export default AdminMenu;