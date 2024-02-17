import React from 'react';
import styles from './TitleCheryx.module.scss';

const TitleCheryx = ({text, wrapperStyle = {}}) => {
  return <section style={wrapperStyle} className={styles.section}>
    <header>{text}</header>
  </section>
}
export default TitleCheryx;