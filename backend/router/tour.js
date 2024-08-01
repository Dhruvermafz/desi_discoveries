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
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage });
const tourRouter = express.Router();

tourRouter.get("/featured", getFeaturedTour);
tourRouter.get("/:id", getSingleTour);
tourRouter.put("/:id", upload.single("file"), updateTour);
tourRouter.delete("/:id", deleteTour);
tourRouter.get("/", getAllTour);
tourRouter.get("/count", getTourCount);
tourRouter.post("/create", upload.single("file"), createTour);
module.exports = tourRouter;
