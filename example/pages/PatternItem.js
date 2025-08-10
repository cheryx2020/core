import React, { useState } from "react";
import PatternItem from "../../src/components/pattern-item/pattern-item";
import Property, { Properties } from "../components/Property";
import { defaultImageUrl } from "../constant";
import ComponentPlayground from "../components/layout/ComponentPlayground"; // Import the new layout

const Index = () => {
    const [imageUrl, setImageUrl] = useState(defaultImageUrl);
    const [name, setName] = useState("Product Name");
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("A beautiful and elegant product description goes here.");
    const [nameColor, setNameColor] = useState("#0A7BCA");
    const [isEditing, setIsEditing] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAddNew, setIsAddNew] = useState(false);
    const [isFree, setIsFree] = useState(false);
    const [isBottom, setIsBottom] = useState(false);

    // Define the component preview
    const patternItemPreview = (
        <PatternItem
            imageUrl={imageUrl}
            name={name}
            discount={Number(discount)}
            description={description}
            nameColor={nameColor}
            isEditing={isEditing}
            isAdmin={isAdmin}
            isBottom={isBottom}
            isFree={isFree}
            isAddNew={isAddNew}
        />
    );

    // Define the controls for the component
    const patternItemControls = (
        <Properties title="PatternItem Properties">
            <Property text="imageUrl" type="input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} description="URL of the product image." />
            <Property text="discount" type="input" value={discount} onChange={(e) => setDiscount(e.target.value)} description="Discount percentage (e.g., 10)." />
            <Property text="name" type="input" value={name} onChange={(e) => setName(e.target.value)} description="The name of the product." />
            <Property text="description" type="input" value={description} onChange={(e) => setDescription(e.target.value)} description="A short product description." />
            <Property text="nameColor" type="input" value={nameColor} onChange={(e) => setNameColor(e.target.value)} description="Color of the product name (hex)." />
            
            <hr className="my-4" /> 
            
            <Property text="isEditing" value={isEditing} onChange={() => setIsEditing(!isEditing)} description="Allow fields to be editable." />
            <Property text="isAdmin" value={isAdmin} onChange={() => setIsAdmin(!isAdmin)} description="Show the admin-specific menu." />
            <Property text="isBottom" value={isBottom} onChange={() => setIsBottom(!isBottom)} description="Use the 'bottom' layout variant." />
            <Property text="isFree" value={isFree} onChange={() => setIsFree(!isFree)} description="Display the 'Free' badge." />
            <Property text="isAddNew" value={isAddNew} onChange={() => setIsAddNew(!isAddNew)} description="Show the 'Add New' placeholder." />
        </Properties>
    );

    return (
        <ComponentPlayground
            title="PatternItem Playground"
            preview={patternItemPreview}
            controls={patternItemControls}
        />
    );
};

export default Index;