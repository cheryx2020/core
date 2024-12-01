import React from 'react';
import PatternItem from '../pattern-item/pattern-item';
import styles from './PatternList.module.scss';

const PatternList = ({ useRouter = () => {}, useDispatch = () => {}, data, isMobile, isAdmin, style = {}, isBottom, className }) => {
return <div className={`${styles.wrapper} ${isBottom ? `${styles.bottom} ${className}` : ''}`} style={{ ...style }}>
        {Array.isArray(data) && data.map((item, index) => <PatternItem useDispatch={useDispatch} useRouter={useRouter} isBottom={isBottom} isAdmin={isAdmin} isMobile={isMobile} key={index} {...item} />)}
        {isAdmin && <PatternItem useDispatch={useDispatch} useRouter={useRouter} name="Pattern Name" description="Description" isEditing={true} isAdmin={isAdmin} isAddNew={true} />}
    </div>
}
export default PatternList;