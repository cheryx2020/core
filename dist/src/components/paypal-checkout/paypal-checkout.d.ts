export default PayPalCheckout;
declare function PayPalCheckout({ PayPalButtons, PayPalScriptProvider, clientId, itemId, instructionText, amount, currency, className, styles }: {
    PayPalButtons?: (() => void) | undefined;
    PayPalScriptProvider?: (() => void) | undefined;
    clientId: any;
    itemId: any;
    instructionText?: string | undefined;
    amount?: string | undefined;
    currency?: string | undefined;
    className: any;
    styles?: {} | undefined;
}): React.JSX.Element;
import React from "react";
