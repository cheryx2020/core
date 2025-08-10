import React, { useState } from "react";
import ImageUploadable from "../../src/components/image-uploadable/image-uploadable";
import Property, { Properties } from "../components/Property";
import { defaultImageUrl } from "../constant";
import ComponentPlayground from "../components/layout/ComponentPlayground"; // Import the reusable layout

const ImageUploadablePage = () => {
    const [isEdit, setEdit] = useState(true);
    const [resizeable, setResizeable] = useState(true);
    const [src, setSrc] = useState(defaultImageUrl);
    
    // Using a textarea for multi-line JSON editing is more user-friendly
    const [wrapperStyle, setWrapperStyle] = useState(
        JSON.stringify({ width: 300, height: 300 }, null, 2)
    );

    // Safely parse the wrapperStyle JSON
    let _wrapperStyle = {};
    try {
        _wrapperStyle = JSON.parse(wrapperStyle);
    } catch (e) {
        // Silently fail, the component will use default styles
        // Or you could show an error message to the user
    }

    // 1. Define the component preview to be displayed
    const componentPreview = (
        // Added a container to center the component within the preview card
        <div className="flex justify-center items-center py-4">
            <ImageUploadable
                src={src}
                wrapperStyle={_wrapperStyle}
                isEdit={isEdit}
                onChangeImage={(data) => {
                    // You can update the state here if you want to preview the uploaded image
                    // For now, just logging to the console.
                    console.log("onChangeImage", data);
                    // setSrc(data.imgSrc); // Example: To show the uploaded image
                }}
                resizeable={resizeable}
            />
        </div>
    );

    // 2. Define the controls for the properties panel
    const componentControls = (
        <Properties title="ImageUploadable Properties">
            <Property
                text="src"
                type="input"
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                description="URL for the default image."
            />
            <Property
                text="wrapperStyle"
                type="textarea" // Using a textarea is better for JSON
                value={wrapperStyle}
                onChange={(e) => setWrapperStyle(e.target.value)}
                description="JSON object for width/height."
            />
            <Property
                text="isEdit"
                value={isEdit}
                onChange={() => setEdit(!isEdit)}
                description="Allow editing and uploading."
            />
            <Property
                text="resizeable"
                value={resizeable}
                onChange={() => setResizeable(!resizeable)}
                description="Allow the container to be resized."
            />
            
            <hr className="my-4" />
            
            <Property
                type="text"
                text="onChangeImage"
                description={
                    <>
                        <span className="text-gray-600">Callback data:</span>
                        <pre className="bg-gray-100 p-2 rounded-md text-sm text-gray-800 mt-1">
                            {`{\n  imgSrc: 'base64',\n  imgFile: File\n}`}
                        </pre>
                    </>
                }
            />
            <Property
                type="text"
                text="onChangeStyle"
                description={
                    <>
                        <span className="text-gray-600">Callback data:</span>
                        <pre className="bg-gray-100 p-2 rounded-md text-sm text-gray-800 mt-1">
                            {`{\n  width: 'number',\n  height: 'number'\n}`}
                        </pre>
                    </>
                }
            />
        </Properties>
    );

    // 3. Render the ComponentPlayground with the preview and controls
    return (
        <ComponentPlayground
            title="ImageUploadable Playground"
            preview={componentPreview}
            controls={componentControls}
        />
    );
};

export default ImageUploadablePage;