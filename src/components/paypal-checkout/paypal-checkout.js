import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ clientId, itemId, amount = "6.00", currency = "USD" }) => {
  const [email, setEmail] = useState(""); // Email input state
  const [isEmailValid, setIsEmailValid] = useState(false); // Track email validity
  const [isShowEmailInput, setIsShowEmailInput] = useState(false); // Control showing email input

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Basic email validation
    setIsEmailValid(event.target.validity.valid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
    } else {
      setIsEmailValid(true); // Email is valid, show PayPal payment button
    }
  };

  return (
    <PayPalScriptProvider options={{ clientId, currency }}>
      <h1>PayPal Checkout</h1>

      {/* First PayPal Button to show email form */}
      {!isShowEmailInput && (
        <PayPalButtons
          style={{ layout: "horizontal" }}
          onClick={() => {
            setIsShowEmailInput(true); // Show email input after PayPal button is clicked
          }}
          createOrder={() => null} // No order created yet
        />
      )}

      {/* Email Input Form */}
      {isShowEmailInput && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Email:{" "}
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder="Enter your email"
              />
            </label>
            <button type="submit" disabled={!isEmailValid}>
              Submit Email
            </button>
          </form>

          {/* Show PayPal Payment Button after email is valid */}
          {isEmailValid && (
            <div style={{ marginTop: "20px" }}>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: amount, // Payment amount passed as prop
                        },
                        custom_id: [email, itemId].join(":"), // Attach email to custom_id
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    console.log("Transaction Details:", details);
                  });
                }}
                onError={(err) => {
                  console.error("PayPal Checkout Error:", err);
                }}
              />
            </div>
          )}
        </div>
      )}
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;