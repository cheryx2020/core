import React, { useState } from "react";
import BestSeller from "../../src/components/best-seller/best-seller";
import { defaultImageUrl } from "../constant";
import ComponentPlayground from "../components/layout/ComponentPlayground";
import Property, { Properties } from "../components/Property";

const BestSellerPage = () => {
    // State for the component's main props
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // State for the properties within the 'data' object
    const [name, setName] = useState("Product Name");
    const [description, setDescription] = useState("This is the best seller of the month.");
    const [nameColor, setNameColor] = useState("#0A7BCA");
    const [imageUrl, setImageUrl] = useState(defaultImageUrl);

    // 1. Define the component preview
    // The 'data' object is constructed from our state variables.
    const componentPreview = (
        <div className="p-4">
            <BestSeller
                isMobile={isMobile}
                isAdmin={isAdmin}
                data={{
                    name: name,
                    description: description,
                    nameColor: nameColor,
                    imageUrl: imageUrl,
                    // These properties can remain static for the demo
                    language: "en",
                    order: 1,
                    patternId: "product-1",
                }}
                // Assuming the component has callbacks we want to demonstrate
                onEditClick={(data) => alert(`Edit clicked for: ${data.name}`)}
                onDeleteClick={(data) => alert(`Delete clicked for: ${data.name}`)}
            />
        </div>
    );

    // 2. Define the controls for the properties panel
    const componentControls = (
        <Properties title="BestSeller Properties">
            {/* Top-level props */}
            <Property
                text="isMobile"
                value={isMobile}
                onChange={() => setIsMobile(!isMobile)}
                description="Toggles the mobile-optimized layout."
            />
            <Property
                text="isAdmin"
                value={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                description="Shows admin controls (e.g., Edit/Delete)."
            />

            <hr className="my-4" />

            {/* Properties within the 'data' object */}
            <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Data Object Properties</h3>
            <Property
                text="name"
                type="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                description="The name of the best-selling product."
            />
            <Property
                text="description"
                type="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                description="A short description for the product."
            />
            <Property
                text="nameColor"
                type="input"
                value={nameColor}
                onChange={(e) => setNameColor(e.target.value)}
                description="The hex color for the product name."
            />
            <Property
                text="imageUrl"
                type="input"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                description="URL of the product's image."
            />
        </Properties>
    );

    // 3. Render the ComponentPlayground with the preview and controls
    return (
        <ComponentPlayground
            layout="Column"
            title="BestSeller Playground"
            preview={componentPreview}
            controls={componentControls}
        />
    );
};

export default BestSellerPage;