import React from 'react';
import styles from './BestSeller.module.scss';
import PatternItem from '../pattern-item/pattern-item';

const BestSeller = ({ useRouter = () => { }, useDispatch = () => { }, isEdit, data, message = "Đây là các lớp hướng dẫn đan thú của mình!" }) => {
    const onClickPatternItem = () => {
        // data && data.ravelryUrl && !isAdmin && window.open(data.ravelryUrl);
    }
    return <div className={styles.wrapper} onClick={onClickPatternItem}>
        <div className={styles.left}>
            <PatternItem useDispatch={useDispatch} useRouter={useRouter} isAdmin={isEdit} key={data?.id} {...data} />
        </div>
        <div className={styles.right}>
            <div className={styles.image}>
                <div className={styles.message}>
                    {message}
                </div>
            </div>
        </div>
    </div>
}
export default BestSeller;