const Razorpay = require("razorpay");
const crypto = require("crypto");
const PaymentDetails = require("../models/Payment");

const instance = new Razorpay({
  key_id: "rzp_test_hNpiaDJEfDPTHX", // Replace with your Razorpay Key ID
  key_secret: "NJBSzOQUSzLFwdQDfTSnntTM", // Ensure this is set in your environment
});

// Create an order
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, notes } = req.body;

    // Create order with Razorpay
    const options = {
      amount: amount * 100, // Amount in paisa
      currency,
      receipt,
      notes,
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to verify payment details
exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    // Find the payment details by order ID
    const paymentDetails = await PaymentDetails.findOne({
      "razorpayDetails.orderId": orderId,
    });

    if (!paymentDetails) {
      return res.status(404).json({ message: "Payment details not found" });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const success = generatedSignature === signature;

    paymentDetails.razorpayDetails.paymentId = paymentId;
    paymentDetails.razorpayDetails.signature = signature;
    paymentDetails.success = success;

    // Save the updated document
    await paymentDetails.save();

    res.status(200).json({
      message: "Payment details verified successfully",
      paymentDetails,
    });
  } catch (error) {
    console.error("Error verifying payment details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getRazorPayKey = async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
};
