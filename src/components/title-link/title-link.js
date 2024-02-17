import React from 'react';
import styles from './TitleLink.module.scss';

const TitleLink = ({text, url, className, Link}) => {
  return <div className={`${styles.wrapper} ${className}`}>
    <div className={styles.text}>{text}</div>
    {url && <Link href={url}><a>{'Xem thêm >>'}</a></Link>}
  </div>
}
export default TitleLink;