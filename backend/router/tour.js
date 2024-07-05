const express = require("express");
const {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourCount,
  updateTour,
} = require("../controllers/tourController");
const { verifyAdmin } = require("../utils/verifyToken");

const tourRouter = express.Router();

tourRouter.get("/featured", getFeaturedTour);
tourRouter.get("/:id", getSingleTour);
tourRouter.put("/:id", verifyAdmin, updateTour);
tourRouter.delete("/:id", deleteTour);
tourRouter.get("/", getAllTour);
tourRouter.get("/count", getTourCount);

module.exports = tourRouter;
