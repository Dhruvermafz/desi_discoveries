const Booking = require("../models/Booking");
const Tour = require("../models/Tour");
const asyncHandler = require("express-async-handler");

// Create a new booking
const createBooking = asyncHandler(async (req, res) => {
  const { tourId, groupSize } = req.body;

  try {
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    // Check if there are enough available spots
    if (tour.bookedSize + groupSize > tour.maxGroupSize) {
      return res.status(400).json({
        success: false,
        message: "Not enough available spots",
      });
    }

    const newBooking = new Booking(req.body);

    // Save the booking with pending status
    const savedBooking = await newBooking.save();

    res.status(200).json({
      success: true,
      message: "Booking created successfully, waiting for payment confirmation",
      data: savedBooking,
    });

    // Simulate payment confirmation process
    setTimeout(async () => {
      const paymentConfirmed = Math.random() > 0.5; // Simulating payment confirmation

      if (paymentConfirmed) {
        savedBooking.status = "confirmed";
        savedBooking.paymentStatus = "confirmed";
        await savedBooking.save();

        // Update the tour's booked size
        tour.bookedSize += groupSize;
        await tour.save();

        console.log("Payment confirmed, booking and tour updated.");
      } else {
        savedBooking.status = "cancelled";
        savedBooking.paymentStatus = "failed";
        await savedBooking.save();

        console.log("Payment failed, booking cancelled.");
      }
    }, 5000); // Simulate a delay for payment confirmation
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// Get a single booking
const getBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to get booking" });
  }
});

// Get all bookings
const getAllBookings = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to get bookings" });
  }
});

module.exports = {
  createBooking,
  getBooking,
  getAllBookings,
};
