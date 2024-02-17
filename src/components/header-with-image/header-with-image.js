
import React from 'react';
import TagWithText from '../tag-with-text/tag-with-text';
import styles from './HeaderWithImage.module.scss';

const HeaderWithImage = ({className}) => {
    return <div className={`${styles.wrapper} ${className}`}>
        <div className={styles.tag}>
            <TagWithText text="Ở đây có hướng dẫn đan len cho người mới bắt đầu!"/>
        </div>
        <img src='/images/tutorial-header.png'></img>
    </div>
}
export default HeaderWithImage;