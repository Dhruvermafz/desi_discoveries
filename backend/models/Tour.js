const mongoose = require("mongoose");

// Define the tour schema
const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    photos: [
      {
        type: String,
        // Set required to false if photos are optional
        required: false,
      },
    ],
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    bookedSize: {
      type: Number,
      default: 0, // Initialize with 0 booked size
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    totalNights: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        username: {
          type: String,
        },
        rating: {
          type: Number,
        },
        reviewText: {
          type: String,
        },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
