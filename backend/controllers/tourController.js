const Tour = require("../models/Tour");
const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to calculate total days and nights
const calculateTotalDaysAndNights = (fromDate, toDate) => {
  const start = new Date(fromDate);
  const end = new Date(toDate);
  const diffTime = Math.abs(end - start);
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const totalNights = totalDays - 1;
  return { totalDays, totalNights };
};

// create new tour
const createTour = asyncHandler(async (req, res) => {
  let imgUrl;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    imgUrl = result.secure_url;
  }

  const { fromDate, toDate } = req.body;
  const { totalDays, totalNights } = calculateTotalDaysAndNights(
    fromDate,
    toDate
  );

  const newTour = new Tour({
    ...req.body,
    photos: [imgUrl],
    totalDays,
    totalNights,
  });
  const savedTour = await newTour.save();
  res.status(200).json({
    success: true,
    message: "Successfully created",
    data: savedTour,
  });
});

// update tour
const updateTour = asyncHandler(async (req, res) => {
  const id = req.params.id;
  let imgUrl;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    imgUrl = result.secure_url;
  }

  const { fromDate, toDate } = req.body;
  const updatedData = { ...req.body };
  if (fromDate && toDate) {
    const { totalDays, totalNights } = calculateTotalDaysAndNights(
      fromDate,
      toDate
    );
    updatedData.totalDays = totalDays;
    updatedData.totalNights = totalNights;
  }
  if (imgUrl) updatedData.photos = [imgUrl];

  const updatedTour = await Tour.findByIdAndUpdate(
    id,
    { $set: updatedData },
    { new: true }
  );
  res.status(200).json({
    success: true,
    message: "Tour updated successfully",
    data: updatedTour,
  });
});

// delete tour
const deleteTour = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Tour.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Tour deleted successfully",
  });
});

// get single tour
const getSingleTour = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const tour = await Tour.findById(id);
  if (!tour) {
    return res.status(404).json({
      success: false,
      message: "Tour not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Tour retrieved successfully",
    data: tour,
  });
});

// get all tours
const getAllTour = asyncHandler(async (req, res) => {
  const tours = await Tour.find();
  res.status(200).json({
    success: true,
    count: tours.length,
    message: "Tours retrieved successfully",
    data: tours,
  });
});

// get featured tours
const getFeaturedTour = asyncHandler(async (req, res) => {
  const tours = await Tour.find({ featured: true });
  res.status(200).json({
    success: true,
    message: "Tours retrieved successfully",
    data: tours,
  });
});

// get tours count
const getTourCount = asyncHandler(async (req, res) => {
  const tourCount = await Tour.estimatedDocumentCount();
  res.status(200).json({
    success: true,
    message: "Tours count successfully",
    data: tourCount,
  });
});

module.exports = {
  createTour,
  deleteTour,
  updateTour,
  getSingleTour,
  getAllTour,
  getFeaturedTour,
  getTourCount,
};
