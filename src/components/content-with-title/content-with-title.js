import React from 'react';
import TitleCheryx2 from '../title-cheryx-2/title-cheryx-2';
import styles from './ContentWithTitle.module.scss';

const ContentWithTitle = ({content, title, className = ''}) => {
  return <div className={`${styles.wrapper} ${className}`}>
    <TitleCheryx2 text={title}/>
    {content}
  </div>
}
export default ContentWithTitle;