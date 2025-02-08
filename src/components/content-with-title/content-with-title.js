import React from 'react';
import TitleCheryx2 from '../title-cheryx-2/title-cheryx-2';
import styles from './ContentWithTitle.module.scss';

const ContentWithTitle = ({content, title, className = '', theme}) => {
  return <div className={`${styles.wrapper} ${className}`}>
    <TitleCheryx2 wrapperStyle={{ line: { backgroundColor: theme?.NAVIGATION?.backgroundColor ?? 'none' }, text: { backgroundColor: theme?.NAVIGATION?.backgroundColor ?? 'none' } }} text={title}/>
    {content}
  </div>
}
export default ContentWithTitle;