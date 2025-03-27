import React from 'react';
import PatternItem from '../pattern-item/pattern-item';
import styles from './PatternList.module.scss';

const PatternList = ({ useRouter = () => {}, useDispatch = () => {}, data, isEdit, style = {}, isBottom, className, language }) => {
return <div className={`${styles.wrapper} ${isBottom ? `${styles.bottom} ${className}` : ''}`} style={{ ...style }}>
        {Array.isArray(data) && data.map((item, index) => <PatternItem language={language} useDispatch={useDispatch} useRouter={useRouter} isBottom={isBottom} isAdmin={isEdit} key={index} {...item} />)}
        {isEdit && <PatternItem language={language} useDispatch={useDispatch} useRouter={useRouter} name="Pattern Name" description="Description" isEditing={true} isAdmin={isEdit} isAddNew={true} />}
    </div>
}
export default PatternList;