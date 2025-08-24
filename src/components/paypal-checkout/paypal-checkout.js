import React, { useState } from "react";
import Input from "../input";
import { APIService } from '@cheryx2020/api-service';


const PayPalCheckout = ({PayPalButtons = () => {}, PayPalScriptProvider = () => {}, clientId, itemId, instructionText = "Enter your email to receive the pattern", amount = "6.00", currency = "USD", className, styles = {} }) => {
  const [email, setEmail] = useState(""); // Email input state
  const [isEmailValid, setIsEmailValid] = useState(false); // Track email validity
  const [isShowEmailInput, setIsShowEmailInput] = useState(false); // Control showing email input
  const [isVerifying, setIsVerifying] = useState(false); // To show a loading message
  const [isSuccess, setIsSuccess] = useState(false); // To show the final success message
  const [verificationError, setVerificationError] = useState(null); // To show any backend error
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
    if (event.target.checkValidity()) {
      alert("Please enter a valid email address.");
    } else {
      setIsEmailValid(true); // Email is valid, show PayPal payment button
    }
  };

  if (isVerifying) {
    return <div>Verifying your payment, please wait...</div>;
  }

  if (verificationError) {
    return (
      <div>
        <p>There was a problem verifying your payment:</p>
        <p><strong>{verificationError}</strong></p>
        <p>Please contact support with your transaction details.</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div>
        <div>🎉 Payment Successful! 🎉</div>
        <p>Thank you for your purchase! Your transaction has been completed and verified.</p>
        <p>
          Please check your email for a confirmation message and any further details regarding your order.
          If you don’t see it in your inbox, be sure to check your spam or junk folder.
        </p>
        <p>If you have any questions or need assistance, feel free to reach out. Enjoy your day!</p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ clientId, currency }}>
      {!isShowEmailInput && !isSuccess && (
        <PayPalButtons
          style={{ layout: "horizontal" }}
          onClick={(data, actions) => {
            setIsShowEmailInput(true);
            return actions.reject();
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
                onApprove={async (data, actions) => {
                  try {
                    const details = await actions.order.capture();
                    console.log("Transaction Details Captured:", details);
                    
                    setIsVerifying(true);

                    const response = await APIService.get(`/verify-order?order=${details.id}`);

                    if (response.data && response.data.error) {
                      throw new Error(response.data.error);
                    }
                    
                    setIsSuccess(true);
                  } catch (error) {
                    console.error("PayPal onApprove or Verification Error:", error);
                    setVerificationError(error.message || "An unexpected error occurred during payment verification. Please contact support.");
                  } finally {
                    setIsVerifying(false);
                  }
                }}
                onError={(err) => {
                  console.error("PayPal Checkout Error:", err);
                  setVerificationError("An error occurred with the PayPal transaction. Please try again.");
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