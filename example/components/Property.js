import React from "react";
import Input from "../../src/components/input/index";

export const Properties = ({ children }) => {
    return <div className="mt-4">{children}</div>;
};

const Property = ({ type = "checkbox", value, onChange = () => {}, text, description, className }) => {
    return (
        <>
            {type === "input" ? (
                <div className="flex items-center my-2">
                    <div className="mr-2 min-w-[100px]">
                        <span className="font-semibold text-gray-800">{text}</span>:{" "}
                        <span className="text-gray-600">{description}</span>
                    </div>
                    <Input
                        className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                        value={value}
                        onChange={onChange}
                    />
                </div>
            ) : (
                <div className={`flex items-center my-2 ${className}`}>
                    {type === "checkbox" ? (
                        <input
                            type={type}
                            checked={value}
                            onChange={onChange}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                    ) : null}
                    <div>
                        <span className="font-semibold text-gray-800">{text}</span>:{" "}
                        <span className="text-gray-600">{description}</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Property;