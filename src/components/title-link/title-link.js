import React from 'react';
import styles from './TitleLink.module.scss';

const TitleLink = ({text, linkText = 'Xem thêm >>', url, className, Link, styles: wrapperStyle = {}}) => {
  return <div style={wrapperStyle} className={`${styles.wrapper} ${className}`}>
    <div className={styles.text}>{text}</div>
    {url && Link && <Link href={url}>{linkText}</Link>}
  </div>
}
export default TitleLink;