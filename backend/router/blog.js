const express = require("express");
const {
  createBlog,
  updateBlog,
  getSingleBlog,
  getAllBlogs,
  getFeaturedBlogs,
} = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.get("/featured", getFeaturedBlogs);
blogRouter.get("/:id", getSingleBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.post("/", createBlog);
blogRouter.put("/:id", updateBlog);

export default blogRouter;
