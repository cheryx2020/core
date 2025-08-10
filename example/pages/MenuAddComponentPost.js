import React, { useState } from 'react';
import MenuAddComponentPost, { POST_ITEM_TYPE } from '../../src/components/menu-add-component-post/menu-add-component-post';
import ComponentPlayground from '../components/layout/ComponentPlayground';
import Property, { Properties } from '../components/Property';

const MenuAddComponentPostPage = () => {
    // State for the component's props
    const [btnClass, setBtnClass] = useState('');
    const [activeMenuItems, setActiveMenuItems] = useState(Object.keys(POST_ITEM_TYPE));
    
    // State to display the result of the callback
    const [lastClickedItem, setLastClickedItem] = useState('None yet');

    // Handler for the checkbox group to toggle menu items
    const handleMenuItemChange = (itemKey, isChecked) => {
        if (isChecked) {
            // Add the item if it's not already there
            setActiveMenuItems(prev => [...new Set([...prev, itemKey])]);
        } else {
            // Remove the item
            setActiveMenuItems(prev => prev.filter(key => key !== itemKey));
        }
    };

    // 1. Define the component preview
    const componentPreview = (
        // A container to give the button context and space for the menu to open.
        // min-height is important so the menu doesn't get cut off by the card's edge.
        <div className="flex justify-center items-center p-8" style={{ minHeight: '300px' }}>
            <MenuAddComponentPost
                btnClass={btnClass}
                menuItems={activeMenuItems}
                onClickMenuItem={(item) => {
                    setLastClickedItem(item);
                    // You can also add an alert or console.log here if you want
                    // alert(`Clicked: ${item}`);
                }}
            />
        </div>
    );

    // 2. Define the controls for the properties panel
    const componentControls = (
        <Properties title="MenuAddComponentPost Properties">
            <Property
                text="btnClass"
                type="input"
                value={btnClass}
                onChange={(e) => setBtnClass(e.target.value)}
                description="Custom CSS classes for the button (e.g., 'bg-blue-500 text-white')."
            />

            <hr className="my-4" />

            {/* A custom control for the 'menuItems' array prop */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Visible Menu Items</h3>
                <p className="text-xs text-gray-500 mb-3">Select which items to include in the menu.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                    {Object.keys(POST_ITEM_TYPE).map(itemKey => (
                        <label key={itemKey} className="flex items-center space-x-2 text-sm">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={activeMenuItems.includes(itemKey)}
                                onChange={(e) => handleMenuItemChange(itemKey, e.target.checked)}
                            />
                            <span>{itemKey}</span>
                        </label>
                    ))}
                </div>
            </div>

            <hr className="my-4" />

            {/* Display for the callback result */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Callback Output</h3>
                <Property type="text" text="onClickMenuItem" description="Fires when a menu item is clicked." />
                <div className="mt-2 p-3 bg-gray-100 rounded-md">
                    <span className="text-gray-600">Last Item Clicked: </span>
                    <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded-md">{lastClickedItem}</span>
                </div>
            </div>
        </Properties>
    );

    // 3. Render the ComponentPlayground
    return (
        <ComponentPlayground
            title="MenuAddComponentPost Playground"
            preview={componentPreview}
            controls={componentControls}
        />
    );
};

export default MenuAddComponentPostPage;