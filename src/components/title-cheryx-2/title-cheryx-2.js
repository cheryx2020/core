import React from 'react';
import styles from './TitleCheryx2.module.scss';
const TitleCheryx2 = ({text, wrapperStyle = {}}) => {
  return <div className={styles.wrapper} style={wrapperStyle}>
  <div className={styles.line}></div>
  <div className={styles.text}>{text}</div>
  <div className={styles.line}></div>
</div>
}
export default TitleCheryx2;