import styles from './Sublink.module.scss';
import React from 'react';

const SubLink = ({data, wrapperStyle = {}, className='', renderItem = () => {}}) => {
    return <div className={styles.wrapper} style={wrapperStyle}>
        {Array.isArray(data) && data.length > 0 && data.map((item,i) => {
            return <div className={`${styles.wrapperLink} ${className}`} key={i}>
            {renderItem(item)}
            {i < data.length - 1 && <div className={styles.spliter}>{'>'}</div>}
            </div>
        })}
    </div>
}
export default SubLink;