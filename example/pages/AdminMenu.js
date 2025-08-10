import React, { useState } from "react";
import { AdminMenu } from "@cheryx2020/core";
import ComponentPlayground from "../components/layout/ComponentPlayground";
import Property, { Properties } from "../components/Property";

const AdminMenuPage = () => {
    // State for the props we want to control interactively
    const [text, setText] = useState("Menu");

    // Define clear handlers for the component's actions
    // Using alert() is a great way to demonstrate that the click worked.
    const handleSave = () => alert('onSaveClick triggered!');
    const handleEdit = () => alert('onEditClick triggered!');
    const handleCancel = () => alert('onCancelClick triggered!');
    const handlePreview = () => alert('onPreviewClick triggered!');

    // 1. Define the component preview
    const componentPreview = (
        // We add some padding and center the menu within the preview card for better presentation
        <div className="flex justify-center p-8">
            <AdminMenu
                text={text}
                onSaveClick={handleSave}
                onEditClick={handleEdit}
                onCancelClick={handleCancel}
                onPreviewClick={handlePreview}
            />
        </div>
    );

    // 2. Define the controls for the properties panel
    const componentControls = (
        <Properties title="AdminMenu Properties">
            {/* Interactive Controls */}
            <Property
                text="text"
                type="input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                description="The main text label for the menu."
            />
            
            <hr className="my-4" />

            {/* Documentation for Callbacks/Actions */}
            <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Actions</h3>
            <Property
                type="text"
                text="onSaveClick"
                description="Fires when the 'Save' button is clicked."
            />
            <Property
                type="text"
                text="onEditClick"
                description="Fires when the 'Edit' button is clicked."
            />
            <Property
                type="text"
                text="onCancelClick"
                description="Fires when the 'Cancel' button is clicked."
            />
            <Property
                type="text"
                text="onPreviewClick"
                description="Fires when the 'Preview' button is clicked."
            />
        </Properties>
    );

    // 3. Render the ComponentPlayground with the preview and controls
    return (
        <ComponentPlayground
            title="AdminMenu Playground"
            preview={componentPreview}
            controls={componentControls}
        />
    );
};

export default AdminMenuPage;