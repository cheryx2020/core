// import Link from 'next/link';
import React from 'react';
import styles from './Sublink.module.scss';
const SubLink = ({data, wrapperStyle = {}, className=''}) => {
    return <div className={styles.wrapper} style={wrapperStyle}>
        {Array.isArray(data) && data.length > 0 && data.map((item,i) => {
            return <div className={`${styles.wrapperLink} ${className}`} key={i}>
            {/* <Link href={item.url}><a>{item.text}</a></Link> */}
            {i < data.length - 1 && <div className={styles.spliter}>{'>'}</div>}
            </div>
        })}
    </div>
}
export default SubLink;