import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalCheckout } from "@cheryx2020/core";
import ComponentPlayground from "../components/layout/ComponentPlayground";
import Property, { Properties } from "../components/Property";

const PayPalCheckoutPage = () => {
    // State for the props we want to control interactively
    const [clientId, setClientId] = useState("ATK7UoCfpJ36qC9nwWz150k5YzMepoSLz7RcoNtqE0BmONMAvVab-kwas-XNqHteFMMPF73u6f2FWwwp");
    const [itemId, setItemId] = useState("test-item-id-123");
    const [instructionText, setInstructionText] = useState("Enter the email to receive the pattern");

    // Define the component preview to be displayed
    // Note: The PayPal buttons may take a moment to load from the script.
    const componentPreview = (
        <div className="p-4" style={{ minHeight: '250px' }}>
            <PayPalCheckout
                // Pass the imported components directly as props
                PayPalScriptProvider={PayPalScriptProvider}
                PayPalButtons={PayPalButtons}
                // Pass props from state to make them interactive
                clientId={clientId}
                itemId={itemId}
                instructionText={instructionText}
                // Define callback handlers to demonstrate functionality
                onSuccess={(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);
                    console.log({ details, data });
                }}
                onError={(err) => {
                    alert("An error occurred during the transaction.");
                    console.error("PayPal Checkout Error:", err);
                }}
                onEmailChange={(email) => {
                    console.log("Email changed to:", email);
                }}
            />
        </div>
    );

    // Define the controls for the properties panel
    const componentControls = (
        <Properties title="PayPalCheckout Properties">
            {/* Interactive Props */}
            <Property
                text="clientId"
                type="input"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                description="Your PayPal Developer App Client ID."
            />
            <Property
                text="itemId"
                type="input"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                description="A unique ID for the item being purchased."
            />
            <Property
                text="instructionText"
                type="input"
                value={instructionText}
                onChange={(e) => setInstructionText(e.target.value)}
                description="Text shown above the email input."
            />

            <hr className="my-4" />

            {/* Static Documentation for Required Props & Callbacks */}
            <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Required Props</h3>
            <Property
                type="text"
                text="PayPalScriptProvider"
                description="The provider component from @paypal/react-paypal-js."
            />
            <Property
                type="text"
                text="PayPalButtons"
                description="The buttons component from @paypal/react-paypal-js."
            />

            <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Callbacks</h3>
            <Property
                type="text"
                text="onSuccess"
                description="Fires when the transaction is successfully completed."
            />
            <Property
                type="text"
                text="onError"
                description="Fires if an error occurs during the transaction."
            />
            <Property
                type="text"
                text="onEmailChange"
                description="Fires when the user types in the email input field."
            />
        </Properties>
    );

    // Render the ComponentPlayground with the preview and controls
    return (
        <ComponentPlayground
            title="PayPalCheckout Playground"
            preview={componentPreview}
            controls={componentControls}
        />
    );
};

export default PayPalCheckoutPage;