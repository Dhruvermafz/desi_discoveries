const Review = require("../models/Review");
const Tour = require("../models/Tour");

export const createReview = async (req, res) => {
  const { username, rating, reviewText } = req.body;
  const { TourId } = req.params;
  const userId = req.userId;

  if (!username || !rating || !reviewText) {
    return res.status(400).json({
      message: "Username, rating and review text are required fields!",
    });
  }

  try {
    const tour = await Tour.findById(TourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found!" });
    }

    const newReview = new Review({
      tour: tour._id,
      username: username,
      reviewText: reviewText,
      rating,
    });

    await newReview.save();

    tour.reviews.push(newReview);
    await tour.save();

    res.status(201).json({ message: "Review created successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create review!" });
  }
};

export const getTourReviews = async (req, res) => {
  const { TourId } = req.params;

  try {
    const tour = await Tour.findById(TourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found!" });
    }

    const reviews = await Review.find({ tour: TourId });

    res.status(200).json({
      count: reviews.length,
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get tour reviews" });
  }
};

export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found!" });
    }

    await Review.findByIdAndDelete(reviewId);

    const tourId = review.tour;
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found!" });
    }

    const updatedReviews = tour.reviews.filter(
      (tourReview) => tourReview.toString() !== reviewId
    );

    tour.reviews = updatedReviews;
    await tour.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete review." });
  }
};
