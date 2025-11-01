export default PayPalCheckout;
declare function PayPalCheckout({ PayPalButtons, PayPalScriptProvider, clientId, itemId, instructionText, amount, currency, className, styles }: {
    PayPalButtons?: () => void;
    PayPalScriptProvider?: () => void;
    clientId: any;
    itemId: any;
    instructionText?: string;
    amount?: string;
    currency?: string;
    className: any;
    styles?: {};
}): React.JSX.Element;
import React from "react";
