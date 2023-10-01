import React, { useState } from 'react';
import styles from './RelatedToMenu.module.scss';

const RelatedToMenu = ({url, text,  textLink, onChange = () => {}, onDragStart = () => {}, index}) => {
  const [showMenuUrl, setShowMenuUrl] = useState(false);
  return <div onDragStart={onDragStart} draggable="true" className={styles.relatedTo}>
  <div className={styles.arrow}></div>
  <div className={styles.textRelatedTo} onClick={() => {setShowMenuUrl(true)}}>{text}</div>
  <a onClick={() => {setShowMenuUrl(true)}}>{textLink}</a>
  {showMenuUrl && <div className={styles.menuLink}>
    <div className={styles.deleteButton} onClick={() => {setShowMenuUrl(false)}}>x</div>
    <label>Text:</label>
    <input className={styles.text} onChange={e => onChange('textLink',e, index)} value={textLink}></input>
    <label>Url:</label>
    <input className={styles.url} onChange={e => onChange('url',e, index)} value={url}></input>
  </div>}
</div>
}
export default RelatedToMenu;