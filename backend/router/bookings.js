const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBooking,
} = require("../controllers/bookingController");
const { verifyAdmin } = require("../utils/verifyToken");

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/:id", getBooking);
bookingRouter.post("/", verifyAdmin, getAllBookings);

module.exports = bookingRouter;
