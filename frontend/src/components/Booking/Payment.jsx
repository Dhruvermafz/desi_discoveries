import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import CartItem from "./CartItem"; // Import the CartItem component

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, price, taxes, total } = location.state || {};

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleUPIPayment = async (e) => {
    e.preventDefault();

    const validTotal = parseInt(total * 100, 10); // Convert total to paise

    if (isNaN(validTotal) || validTotal < 100) {
      console.error(
        "Invalid amount. The minimum value should be 100 paise (₹1)."
      );
      return;
    }

    try {
      // Create a Razorpay order on the backend
      const result = await axios.post(`${BASE_URL}/payment/order`, {
        amount: validTotal, // Amount in paisa (INR)
      });

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "rzp_live_hDOS5nsBQ7ZRER", // Replace with your Razorpay Key ID
        amount: amount,
        currency: currency,
        name: "Desi Discoveries",
        description: "Booking Payment",
        order_id: order_id,
        handler: async function (response) {
          try {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            // Verify the payment on the backend
            await axios.post(`${BASE_URL}/payment/verify`, data);

            // Proceed with the booking after successful payment
            await axios.post(`${BASE_URL}/booking`, booking);

            navigate("/thank-you");
          } catch (error) {
            console.error("Payment verification failed:", error);
            // Handle payment verification failure
          }
        },
        prefill: {
          name: "Desi Discoveries", // You might want to use actual user details here
          email: "pickyvibe@gmail.com",
          contact: "9999999999",
        },
        notes: {
          address: "Soumya Dey Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error processing UPI payment", error);
      // Handle payment processing failure
    }
  };

  return (
    <div className="payment">
      <h3>Review Your Booking</h3>
      <div className="cart">
        <CartItem
          title={booking?.tourName}
          price={price}
          quantity={booking?.groupSize}
        />
        {/* You can add more CartItem components here if needed */}
        <div className="cart-summary">
          <h4>Summary</h4>
          <p>Taxes: ₹{taxes.toFixed(2)}</p>
          <p>Total: ₹{total.toFixed(2)}</p>
        </div>
      </div>

      <h3>Choose Payment Method</h3>
      <div className="payment__method">
        <form onSubmit={handleUPIPayment}>
          <button type="submit" className="btn primary__btn w-100 mt-4">
            Pay ₹{total.toFixed(2)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
