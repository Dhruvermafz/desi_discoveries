const mongoose = require("mongoose");

const RefundsSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  requested_date: {
    type: String,
  },
  bookingId: {
    type: String,
  },
  additional_note: {
    type: String,
  },
});

module.exports = mongoose.model("Refund", RefundsSchema);
