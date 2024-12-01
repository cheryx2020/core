import React, { useState } from "react";
import PatternItem from "../../src/components/pattern-item/pattern-item";
import Property, { Properties } from "../components/Property";
import { defaultImageUrl } from "../constant";

const Index = () => {
    const [imageUrl, setImageUrl] = useState(defaultImageUrl);
    const [name, setName] = useState("Product Name");
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("Description");
    const [nameColor, setNameColor] = useState("#0A7BCA");
    const [isEditing, setIsEditing] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAddNew, setIsAddNew] = useState(false);
    const [isFree, setIsFree] = useState(false);
    const [isBottom, setIsBottom] = useState(false);
    return <div>
        <div style={{ width: 400, height: 'auto' }}>
            <PatternItem 
                imageUrl={imageUrl} 
                name={name} 
                discount={discount}
                description={description} 
                nameColor={nameColor} 
                isEditing={isEditing} 
                isAdmin={isAdmin} 
                isBottom={isBottom}
                isFree={isFree} 
                isAddNew={isAddNew}
            />
        </div>
        <Properties>
            <Property text="imageUrl" type="input" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }} description="" />
            <Property text="discount" type="input" value={discount} onChange={(e) => { setDiscount(e.target.value) }} description="" />
            <Property text="name" type="input" value={name} onChange={(e) => { setName(e.target.value) }} description="" />
            <Property text="description" type="input" value={description} onChange={(e) => { setDescription(e.target.value) }} description="" />
            <Property text="nameColor" type="input" value={nameColor} onChange={(e) => { setNameColor(e.target.value) }} description="" />
            <Property text="isEditing" value={isEditing} onChange={() => { setIsEditing(!isEditing) }} description="to make sure the component can editable or not" />
            <Property text="isAdmin" value={isAdmin} onChange={() => { setIsAdmin(!isAdmin) }} description="to show admin menu" />
            <Property text="isBottom" value={isBottom} onChange={() => { setIsBottom(!isBottom) }} description="is bottom layout" />
            <Property text="isFree" value={isFree} onChange={() => { setIsFree(!isFree) }} description="is free" />
            <Property text="isAddNew" value={isAddNew} onChange={() => { setIsAddNew(!isAddNew) }} description="is add new" />
        </Properties>
    </div>
}
export default Index;