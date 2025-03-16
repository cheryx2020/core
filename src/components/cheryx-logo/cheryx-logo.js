import React from 'react';
import styles from './CheryxLogo.module.scss';

const CheryxLogo = ({alt}) => {
  return <div className={styles.logo}>
    <div className={styles.cheryx}></div>
    <img width="143px" height='18px' alt={alt} className={styles.slogan} src="/images/cheryx-slogan.webp"></img>
  </div>
}
export default CheryxLogo;