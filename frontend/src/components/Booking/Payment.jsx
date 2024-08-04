import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { BASE_URL } from "../../utils/config";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, price } = location.state || {};

  const handleUPIPayment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/create-upi-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount: price * 100, // Amount in paisa (INR)
        }),
      });
      const data = await response.json();

      // Assuming the response contains a UPI payment URL or QR code
      const upiPaymentUrl = data.upiPaymentUrl;

      window.location.href = upiPaymentUrl;
    } catch (error) {
      console.error("Error processing UPI payment", error);
    }
  };

  return (
    <div className="payment">
      <h3>Choose Payment Method</h3>

      <div className="payment__method">
        <PayPalScriptProvider options={{ "client-id": "your-client-id-here" }}>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: price.toFixed(2),
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const details = await actions.order.capture();
              try {
                await fetch(`${BASE_URL}/booking`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify(booking),
                });

                navigate("/thank-you");
              } catch (error) {
                console.error("Booking creation failed:", error);
              }
            }}
            onError={(err) => {
              console.error("PayPal Checkout onError:", err);
            }}
          />
        </PayPalScriptProvider>
      </div>

      <div className="payment__method">
        <form onSubmit={handleUPIPayment}>
          <button type="submit" className="btn primary__btn w-100 mt-4">
            Pay with UPI
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
