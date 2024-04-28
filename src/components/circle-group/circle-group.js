import React from "react";
import ImageUploadable from "../image-uploadable/image-uploadable";
import styles from "./circle-group.module.scss";

const CircleItem = ({ isAdmin, url, onChangeItem = () => { } }) => {
    const style = {
        background: `url('${url}')`
    }
    return isAdmin ? <ImageUploadable onChangeImage={(data) => { onChangeItem({ data, url }) }} imgStyle={{ width: "100%" }} src={url} isEdit={true} /> : <div style={style}></div>
}

const CircleGroup = ({ isAdmin, urls = [], isMobile, onChangeData = () => { }, wrapperClass }) => {
    const urlsToShow = isMobile ? urls?.slice(0, 3) : urls;
    return <div className={`$${styles.images} ${wrapperClass ? wrapperClass : ''}`}>
        {urlsToShow.map(url => <CircleItem onChangeItem={(data) => { onChangeData(data) }} isAdmin={isAdmin} key={url} url={url} />)}
    </div>
}

export default CircleGroup;