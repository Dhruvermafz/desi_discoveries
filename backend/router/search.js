const express = require("express");
const { getTourBySearch } = require("../controllers/searchController");

const searchRouter = express.Router();

searchRouter.get("/", getTourBySearch);

module.exports = searchRouter;
