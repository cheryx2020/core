import React, { useState } from "react";
import Input from "../input";

const PayPalCheckout = ({PayPalButtons = () => {}, PayPalScriptProvider = () => {}, clientId, itemId, instructionText = "Enter your email to receive the pattern", amount = "6.00", currency = "USD", className, styles = {} }) => {
  const [email, setEmail] = useState(""); // Email input state
  const [isEmailValid, setIsEmailValid] = useState(false); // Track email validity
  const [isShowEmailInput, setIsShowEmailInput] = useState(false); // Control showing email input
  const [isSuccess, setIsSuccess] = useState(true);
  const _styles = {
    width: "100%",
    ...styles,
  }

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
      {!isShowEmailInput && !isSuccess && (
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
        <div className={className} styles={_styles}>
          <form onSubmit={handleSubmit}>
            <label>
              <Input
                id={instructionText}
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder="Enter your email"
              />
            </label>
          </form>

          {/* Show PayPal Payment Button after email is valid */}
          {isEmailValid && !isSuccess && (
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
                    setIsSuccess(true);
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
      {/* Success message */}
      {isSuccess && <div>
            <div>🎉 Payment Successful! 🎉</div>

            <p>Thank you for your purchase! Your transaction has been completed successfully.</p>

            <p>Please check your email for a confirmation message and any further details regarding your order. If you don’t see it in your inbox, be sure to check your spam or junk folder just in case!</p>

            <p>If you have any questions or need assistance, feel free to reach out. Enjoy your day!</p>
          </div>}
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;