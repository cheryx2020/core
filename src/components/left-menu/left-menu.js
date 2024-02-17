import React from 'react';
import styles from './LeftMenu.module.scss';

const LeftMenu = ({ data = [], selected, isAdmin, onSelectedItem = () => {} }) => {
  const makeItem = item => {
    return <>
      <div className={styles.icon} style={{ backgroundImage: `url('${item.icon}')` }}></div>
      <div>{item.title}</div>
    </>
  }
  return <div className={styles.leftMenu}>
    {data.map((item, index) => { 
      if (isAdmin) {
        return <div key={index} onClick={() => onSelectedItem(item.key)} className={styles.item + ` ${item.key === selected ? styles.selected : ''}`}>{makeItem(item)}</div>
      }
      return <a key={index} href={item.url} className={styles.item + ` ${item.key === selected ? styles.selected : ''}`}>{makeItem(item)}</a>
      })}
  </div>
}
export default LeftMenu;