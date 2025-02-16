import React from 'react';
import TitleCheryx2 from '../title-cheryx-2/title-cheryx-2';
import styles from './ContentWithTitle.module.scss';

const ContentWithTitle = ({content, title, className = '', theme}) => {
  const backgroundColor = theme?.NAVIGATION?.backgroundColor ?? 'none';
  return <div className={`${styles.wrapper} ${className}`}>
    <TitleCheryx2 wrapperStyle={{ line: { backgroundColor }, text: { backgroundColor } }} text={title}/>
    {content}
  </div>
}
export default ContentWithTitle;