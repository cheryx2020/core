import React from "react";
import {
	PayPalScriptProvider,
	PayPalButtons,
} from "@paypal/react-paypal-js";
import { PayPalCheckout } from "@cheryx2020/core";

const Index = () => {
    return <div>
        <div style={{ width: 400, height: 300, border: "solid 1px gray" }}>
            <PayPalCheckout
                PayPalScriptProvider={PayPalScriptProvider}
                PayPalButtons={PayPalButtons}
                clientId="ATK7UoCfpJ36qC9nwWz150k5YzMepoSLz7RcoNtqE0BmONMAvVab-kwas-XNqHteFMMPF73u6f2FWwwp"
                itemId="test-id"
                instructionText="Enter the email to receive the pattern"
            />
        </div>
    </div>
}
export default Index;