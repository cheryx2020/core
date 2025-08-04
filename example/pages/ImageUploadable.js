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

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image Uploadable Section */}
                    <div className="flex-1 flex justify-center items-center">
                        <div className="relative">
                            <ImageUploadable
                                className={`${className} rounded-lg border border-gray-300 shadow-md`}
                                src={src}
                                wrapperStyle={_wrapperStyle}
                                isEdit={isEdit}
                                onChangeImage={(data) => {
                                    console.log("onChangeImage", data);
                                }}
                                resizeable={resizeable}
                            />
                            {isEdit && (
                                <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                    Editable
                                </span>
                            )}
                            {resizeable && (
                                <span className="absolute bottom-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                    Resizable
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Properties Section */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Properties</h2>
                        <Properties className="space-y-4">
                            <Property
                                text="className"
                                type="input"
                                value={className}
                                onChange={(e) => {
                                    setClassName(e.target.value);
                                }}
                                description=""
                                className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                            />
                            <Property
                                text="wrapperStyle"
                                type="input"
                                value={wrapperStyle}
                                onChange={(e) => {
                                    setWrapperStyle(e.target.value);
                                }}
                                description=""
                                className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                            />
                            <Property
                                text="src"
                                type="input"
                                value={src}
                                onChange={(e) => {
                                    setSrc(e.target.value);
                                }}
                                description=""
                                className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                            />
                            <Property
                                text="isEdit"
                                value={isEdit}
                                onChange={() => {
                                    setEdit(!isEdit);
                                }}
                                description="To make sure the component can be editable or not"
                                className="flex items-center space-x-2"
                            />
                            <Property
                                text="resizeable"
                                value={resizeable}
                                onChange={() => {
                                    setResizeable(!resizeable);
                                }}
                                description="To make sure the component can resize or not"
                                className="flex items-center space-x-2"
                            />
                            <Property
                                type="text"
                                text="onChangeImage"
                                description={
                                    <>
                                        <span className="text-gray-600">Data response: </span>
                                        <pre className="bg-gray-50 p-2 rounded-md text-sm text-gray-800">
                                            {`{ \n  imgSrc: 'base64 image data', \n  imgFile: 'File object of image'\n}`}
                                        </pre>
                                    </>
                                }
                                className="text-gray-600"
                            />
                            <Property
                                type="text"
                                text="onChangeStyle"
                                description={
                                    <>
                                        <span className="text-gray-600">Data response: </span>
                                        <pre className="bg-gray-50 p-2 rounded-md text-sm text-gray-800">
                                            {`{ \n  width: 'image width', \n  height: 'image height'\n}`}
                                        </pre>
                                    </>
                                }
                                className="text-gray-600"
                            />
                        </Properties>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;