const express = require("express");
const {
  createReview,
  getTourReviews,
  deleteReview,
} = require("../controllers/reviewController");
const { verifyUser } = require("../utils/verifyToken");

const reviewRouter = express.Router();

reviewRouter.post("/:ToutId", createReview);
reviewRouter.get("/:TourId", getTourReviews);
reviewRouter.delete("/:reviewId", verifyUser, deleteReview);

module.exports = reviewRouter;
