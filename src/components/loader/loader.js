import React from 'react';
import styles from './Loader.module.scss';
const Loader = ({...rest}) => {
  return <div {...rest} className={styles.loadingWrapper}>
    <div className={styles.ldsHourglass}></div>
  </div>
}
export default Loader;
