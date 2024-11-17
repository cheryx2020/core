import React from "react";
import PayPalCheckout from "../../src/components/paypal-checkout/paypal-checkout";

const Index = () => {
    return <div>
        <div style={{ width: 400, height: 300, border: "solid 1px gray" }}>
            <PayPalCheckout 
                clientId="AdzCHyvdcsuBpt-S0UqRExMe417mqlbjLm2oKv3od36JBtc-4aPZ1VxyENkuY19YzxCO3fahG4XwhtTj"
                itemId="test-id"
                instructionText="Enter the email to receive"
            />
        </div>
    </div>
}
export default Index;