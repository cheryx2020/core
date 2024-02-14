import React, { useState } from "react";
import ImageUploadable from "../../src/components/image-uploadable/image-uploadable";
import Property, { Properties } from "../components/Property";
import { defaultImageUrl } from "../constant";

const Index = () => {
    const [isEdit, setEdit] = useState(true);
    const [resizeable, setResizeable] = useState(true);
    const [src, setSrc] = useState(defaultImageUrl);
    const [className, setClassName] = useState("");
    const [wrapperStyle, setWrapperStyle] = useState(`{"width": 300, "height": 300}`);
    let _wrapperStyle = {};
    try {
        _wrapperStyle = JSON.parse(wrapperStyle);
    } catch (e) {
        console.log(e);
    }
    return <div>
        <ImageUploadable className={className} src={src} wrapperStyle={_wrapperStyle} isEdit={isEdit} onChangeImage={(data) => { console.log("onChangeImage", data) }} resizeable={resizeable} />
        <Properties>
            <Property text="className" type="input" value={className} onChange={(e) => { setClassName(e.target.value) }} description="" />
            <Property text="wrapperStyle" type="input" value={wrapperStyle} onChange={(e) => { setWrapperStyle(e.target.value) }} description="" />
            <Property text="src" type="input" value={src} onChange={(e) => { setSrc(e.target.value) }} description="" />
            <Property text="isEdit" value={isEdit} onChange={() => { setEdit(!isEdit) }} description="to make sure the component can editable or not" />
            <Property text="resizeable" value={resizeable} onChange={() => { setResizeable(!resizeable) }} description="to make sure the component can resize or not" />
            <Property type="text" text="onChangeImage" description={<><span>Data response: </span><pre>{`{ \n  imgSrc: 'base64 image data', \n  imgFile: 'File object of image'\n}`}</pre></>} />
            <Property type="text" text="onChangeStyle" description={<><span>Data response: </span><pre>{`{ \n  width: 'image width', \n  height: 'image height'\n}`}</pre></>} />
        </Properties>
    </div>
}
export default Index;