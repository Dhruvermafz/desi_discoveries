import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Alert, Form } from "react-bootstrap";
import { BASE_URL } from "../../utils/config";

// Load PayPal script dynamically
const loadPayPalScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=your-client-id-here";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("PayPal SDK failed to load"));
    document.body.appendChild(script);
  });
};

const PaymentPage = () => {
  const location = useLocation();
  const { booking, price } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);
  const [paypalScriptLoaded, setPaypalScriptLoaded] = useState(false);

  useEffect(() => {
    const loadScript = async () => {
      try {
        await loadPayPalScript();
        setPaypalScriptLoaded(true);
      } catch (error) {
        console.error(error);
        setIsPaymentFailed(true);
      }
    };

    if (paymentMethod === "paypal") {
      loadScript();
    }
  }, [paymentMethod]);

  useEffect(() => {
    if (paypalScriptLoaded && paymentMethod === "paypal") {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: price,
                  },
                  description: `Booking for ${booking.tourName} by ${booking.fullName}`,
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            try {
              const order = await actions.order.capture();
              // Notify your server of the successful payment
              await fetch(`${BASE_URL}/booking`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(booking),
              });

              setIsPaymentSuccessful(true);
              setIsPaymentFailed(false);
              setTimeout(() => {
                window.location.href = "/thank-you";
              }, 1000);
            } catch (error) {
              console.error("Payment failed", error);
              setIsPaymentFailed(true);
              setIsPaymentSuccessful(false);
            }
          },
          onError: (err) => {
            console.error("PayPal error", err);
            setIsPaymentFailed(true);
            setIsPaymentSuccessful(false);
          },
        })
        .render("#paypal-button-container");
    }
  }, [paypalScriptLoaded, price, booking, paymentMethod]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleUPI = async () => {
    // Implement UPI payment logic here
    // You will need to integrate with a UPI payment gateway
    console.log("UPI payment initiated");
  };

  const handleCreditCard = async () => {
    // Implement credit card payment logic here
    // This would involve integrating with a payment processor like Stripe
    console.log("Credit Card payment initiated");
  };

  return (
    <div className="payment-page">
      <h2>Payment for Tour</h2>

      {isPaymentSuccessful && (
        <Alert variant="success">Payment Successful</Alert>
      )}
      {isPaymentFailed && (
        <Alert variant="danger">Payment Failed. Please try again.</Alert>
      )}

      <Form>
        <Form.Group controlId="paymentMethod">
          <Form.Label>Select Payment Method</Form.Label>
          <Form.Control
            as="select"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="paypal">PayPal</option>
            <option value="upi">UPI</option>
            <option value="creditCard">Credit/Debit Card</option>
          </Form.Control>
        </Form.Group>
      </Form>

      {paymentMethod === "paypal" && (
        <div id="paypal-button-container" className="paypal-buttons">
          {/* PayPal buttons will be inserted here */}
        </div>
      )}

      {paymentMethod === "upi" && (
        <Button className="btn primary__btn w-100 mt-4" onClick={handleUPI}>
          Pay with UPI
        </Button>
      )}

      {paymentMethod === "creditCard" && (
        <Button
          className="btn primary__btn w-100 mt-4"
          onClick={handleCreditCard}
        >
          Pay with Credit/Debit Card
        </Button>
      )}
    </div>
  );
};

export default PaymentPage;
