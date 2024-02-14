import React, { useState } from "react";
import PatternItem from "../../src/components/pattern-item/pattern-item";
import Property, { Properties } from "../components/Property";
import { defaultImageUrl } from "../constant";

const Index = () => {
    const [imageUrl, setImageUrl] = useState(defaultImageUrl);
    const [name, setName] = useState("Pattern Name");
    const [description, setDescription] = useState("Description");
    const [nameColor, setNameColor] = useState("#0A7BCA");
    const [isEditing, setIsEditing] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [listPatternDetail, setListPatternDetail] = useState(`[{"value": 1, "label": "Option 1"}]`);
    let _listPatternDetail = [];
    try {
        _listPatternDetail = JSON.parse(listPatternDetail);
    } catch(e) {}
    return <div>
        <PatternItem imageUrl={imageUrl} name={name} description={description} nameColor={nameColor} isEditing={isEditing} isAdmin={isAdmin} listPatternDetail={_listPatternDetail}/>
        <Properties>
            <Property text="imageUrl" type="input" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }} description="" />
            <Property text="name" type="input" value={name} onChange={(e) => { setName(e.target.value) }} description="" />
            <Property text="description" type="input" value={description} onChange={(e) => { setDescription(e.target.value) }} description="" />
            <Property text="nameColor" type="input" value={nameColor} onChange={(e) => { setNameColor(e.target.value) }} description="" />
            <Property text="isEditing" value={isEditing} onChange={() => { setIsEditing(!isEditing) }} description="to make sure the component can editable or not" />
            <Property text="isAdmin" value={isAdmin} onChange={() => { setIsAdmin(!isAdmin) }} description="to show admin menu" />
            <Property text="listPatternDetail" type="input" value={listPatternDetail} onChange={(e) => { setListPatternDetail(e.target.value) }} description="" />
        </Properties>
    </div>
}
export default Index;