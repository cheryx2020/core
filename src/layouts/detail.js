import React from 'react';
import styles from './DetailLayout.module.scss';
const DetailLayout = ({ leftComponent, rightComponent, rightComponentWrapperStyle = {}, wrapperStyle = {}, isMobile, bottomComponent, isPattern}) => {
  return <div className={`${styles.listVideo} ${isPattern ? styles.isPattern : ''}`} style={{...wrapperStyle, gridTemplateColumns: leftComponent ? '24.11% 1fr' : '1fr', gridTemplateRows: leftComponent ? isMobile ? '101px 1fr' : '1fr' : '1fr'}}>
    {leftComponent}
    <section className={styles.rightSide} style={rightComponentWrapperStyle}>
      {rightComponent}
    </section>
    {bottomComponent}
  </div>
}
export default DetailLayout;