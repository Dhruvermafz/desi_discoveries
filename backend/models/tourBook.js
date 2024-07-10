const mongoose = require("mongoose");

const tourBook = new Schema({
  currentUser: {
    type: String,
    required: [true, "USer must login first."],
  },
  username: {
    type: String,
    required: [true, "Must provide your username"],
  },
  date: {
    type: Date,
    required: [true, "Must provide a date to start tour."],
  },
  phone: {
    type: String,
    required: [true, "Must provide a phone number."],
  },
  guestCount: {
    type: Number,
    required: [true, "Must provide a guest count."],
  },
});

const tourReservation = mongoose.model("tourReservation", tourBook);
module.exports = tourReservation;
