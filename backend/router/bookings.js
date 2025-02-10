const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBooking,
  getAllUserBookings,
} = require("../controllers/bookingController");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/:id", getBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.get("/me", verifyUser, getAllUserBookings);
module.exports = bookingRouter;
