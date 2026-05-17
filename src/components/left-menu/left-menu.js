import React from 'react';
import styles from './LeftMenu.module.scss';

const LeftMenu = ({ data = [], selected, isAdmin, onSelectedItem = () => { }, Link = ({ children }) => { return children } }) => {
  const makeItem = item => {
    return <>
      <div className={styles.icon} style={{ backgroundImage: `url('${item.icon}')` }}></div>
      <div>{item.title}</div>
    </>
  }
  return <div className={styles.leftMenu}>
    {data.map((item) => {
      if (isAdmin) {
        return <div key={item.key} onClick={() => onSelectedItem(item.key)} className={styles.item + ` ${item.key === selected ? styles.selected : ''}`}>{makeItem(item)}</div>
      }
      return <Link key={item.key} href={item.url} className={styles.item + ` ${item.key === selected ? styles.selected : ''}`}>{makeItem(item)}</Link>
    })}
  </div>
}
export default LeftMenu;