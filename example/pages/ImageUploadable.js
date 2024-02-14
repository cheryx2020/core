import React, { useState } from "react";
import ImageUploadable from "../../src/components/image-uploadable/image-uploadable";
const Property = ({type = "checkbox",value, onChange = () => {}, text, description}) => {
    return <>
        <div style={{display: 'flex'}}>{type === "checkbox" ? <input type={type} checked={value} onChange={onChange}/>: null}<div><b>{text}</b>: {description}</div></div>
    </>
}
const Index = () => {
    const [isEdit, setEdit] = useState(true);
    const [resizeable, setResizeable] = useState(true);
    return <div>
        <ImageUploadable wrapperStyle={{width: 300, height: 300}} isEdit={isEdit} onChangeImage={(data) => { console.log("onChangeImage", data)}} resizeable={resizeable}/>
        <Property text="isEdit" value={isEdit} onChange={() => { setEdit(!isEdit) }} description="to make sure the component can editable or not"/>
        <Property text="resizeable" value={resizeable} onChange={() => { setResizeable(!resizeable) }} description="to make sure the component can resize or not"/>
        <Property type="text" text="onChangeImage" description={<><span>Data response: </span><pre>{`{ \n  imgSrc: 'This is the base64 image data', \n  imgFile: 'This is the File object of image'\n}`}</pre></>}/>
    </div>
}
export default Index;