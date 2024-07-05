const express = require("express");
const {
  createBlog,
  updateBlog,
  getSingleBlog,
  getAllBlogs,
  getFeaturedBlogs,
} = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.post("/", createBlog);
blogRouter.put("/:id", updateBlog);
blogRouter.get("/:id", getSingleBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/featured", getFeaturedBlogs);

module.exports = blogRouter;
