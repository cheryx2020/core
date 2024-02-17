import React, { useEffect, useState } from 'react';
import PatternItem from '../pattern-item/pattern-item';
import styles from './PatternList.module.scss';
import { getListTips } from '@cheryx2020/utils';

const PatternList = ({ useRouter = () => {}, useDispatch = () => {}, language = 'vi', data, isMobile, isAdmin, style = {}, isBottom, onLoadPatternList = () => { }, className }) => {
    const [listPatternDetail, setListPatternDetail] = useState([{ value: '1', label: 'Mmmm' }]);
    useEffect(() => {
        getListTips({ language, isPattern: true }).then(res => {
            if (Array.isArray(res)) {
                const result = res.map(i => { return { value: i.id, label: i.title } });
                setListPatternDetail(result);
                onLoadPatternList(result);
            }
        }).catch(e => {
            console.log(e);
        });
    }, []);
    return <div className={`${styles.wrapper} ${isBottom ? `${styles.bottom} ${className}` : ''}`} style={{ ...style }}>
        {Array.isArray(data) && data.map((item, index) => <PatternItem useDispatch={useDispatch} useRouter={useRouter} listPatternDetail={listPatternDetail} isBottom={isBottom} isAdmin={isAdmin} isMobile={isMobile} key={index} {...item} />)}
        {isAdmin && <PatternItem useDispatch={useDispatch} useRouter={useRouter} listPatternDetail={listPatternDetail} name="Pattern Name" description="Description" isEditing={true} isAdmin={isAdmin} isAddNew={true} />}
    </div>
}
export default PatternList;