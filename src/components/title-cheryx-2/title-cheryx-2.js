import React from 'react';
import styles from './TitleCheryx2.module.scss';
const TitleCheryx2 = ({text, wrapperStyle = {line: {}, text: {}, wrapper: {}}}) => {
  return <div className={styles.wrapper} style={wrapperStyle.wrapper}>
  <div className={styles.line} style={wrapperStyle.line}></div>
  <div className={styles.text} style={wrapperStyle.text}>{text}</div>
  <div className={styles.line} style={wrapperStyle.line}></div>
</div>
}
export default TitleCheryx2;