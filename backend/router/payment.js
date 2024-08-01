const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const bookingController = require("../controllers/bookingController"); // Add booking controller if needed

// Route to create a payment intent
router.post("/create-payment-intent", paymentController.createPaymentIntent);

// Route to handle booking
router.post("/booking", bookingController.createBooking); // Implement this controller to handle booking

module.exports = router;
