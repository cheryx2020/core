import React from 'react';
import styles from './CheryxLogo.module.scss';

const CheryxLogo = () => {
  return <div className={styles.logo}>
    <div className={styles.cheryx}></div>
    <img width="143px" height='18px' alt={process?.env?.NEXT_PUBLIC_SEO_mainTitle} className={styles.slogan} src="/images/cheryx-slogan.webp"></img>
  </div>
}
export default CheryxLogo;