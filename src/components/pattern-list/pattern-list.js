import React from 'react';
import PatternItem from '../pattern-item/pattern-item';
import styles from './PatternList.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { APIService } from '@cheryx2020/api-service';

const PatternList = ({ useRouter = () => { }, useDispatch = () => { }, data, isEdit, style = {}, isBottom, className, language, api }) => {
    const [_data, setData] = useState(data);
    useEffect(() => {
        api && APIService.get(api).then(res => {
            setData(res?.data?.data ?? []);
        })
    }, [isEdit]);

    useEffect(() => {
        setData(data);
    }, [data])
    return <div className={`${styles.wrapper} ${isBottom ? `${styles.bottom} ${className}` : ''}`} style={{ ...style }}>
        {Array.isArray(_data) && _data.map((item, index) => <PatternItem language={language} useDispatch={useDispatch} useRouter={useRouter} isBottom={isBottom} isAdmin={isEdit} key={index} {...item} />)}
        {isEdit && <PatternItem language={language} useDispatch={useDispatch} useRouter={useRouter} name="Pattern Name" description="Description" isEditing={true} isAdmin={isEdit} isAddNew={true} />}
    </div>
}
export default PatternList;