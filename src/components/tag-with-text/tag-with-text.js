import React from 'react';
import styles from './TagWithText.module.scss';

const TagWithText = ({text}) => {
    return <div className={styles.wrapper}>
        <div className={styles.inner}>{text}</div>
        <div className={styles.line1}>
            <div className={styles.circle}>
                <div className={styles.middle}></div>
            </div>
        </div>
        <div className={styles.line2}>
            <div className={styles.circle}>
                <div className={styles.middle}></div>
            </div>
        </div>
    </div>
}
export default TagWithText;