const mongoose = require("mongoose");

const PaymentDetailsSchema = mongoose.Schema({
  razorpayDetails: {
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    signature: { type: String, required: true },
  },
  success: { type: Boolean, default: false },
});

module.exports = mongoose.model("PaymentDetails", PaymentDetailsSchema);
