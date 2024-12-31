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
    {data.map((item, index) => {
      if (isAdmin) {
        return <div key={index} onClick={() => onSelectedItem(item.key)} className={styles.item + ` ${item.key === selected ? styles.selected : ''}`}>{makeItem(item)}</div>
      }
      return <Link key={index} href={item.url}><a href={item.url} className={styles.item + ` ${item.key === selected ? styles.selected : ''}`}>{makeItem(item)}</a></Link>
    })}
  </div>
}
export default LeftMenu;