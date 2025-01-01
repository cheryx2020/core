import React from 'react';
import styles from './TitleCheryx2.module.scss';
const TitleCheryx2 = ({text, wrapperStyle = {}, style = {}}) => {
  return <div className={styles.wrapper} style={wrapperStyle}>
  <div className={styles.line} style={style}></div>
  <div className={styles.text} style={style}>{text}</div>
  <div className={styles.line} style={style}></div>
</div>
}
export default TitleCheryx2;