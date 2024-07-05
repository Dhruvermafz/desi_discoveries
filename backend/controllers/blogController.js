const express = require("express");
const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");

// Create a new blog
const createBlog = asyncHandler(async (req, res) => {
  console.log(req.body);
  const newBlog = await Blog.create(req.body);
  console.log(newBlog);
  res.status(201).json(newBlog);
});

// Update an existing blog
const updateBlog = asyncHandler(async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedBlog);
});

// Get a single blog by ID
const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
});

// Get all blogs with pagination
const getAllBlogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const blogs = await Blog.paginate({}, { page, limit });
  res.status(200).json(blogs);
});

// Get all featured blogs
const getFeaturedBlogs = asyncHandler(async (req, res) => {
  const featuredBlogs = await Blog.find({ featured: true });
  if (featuredBlogs.length > 0) {
    res.status(200).json({
      success: true,
      message: "Featured blogs retrieved successfully",
      data: featuredBlogs,
    });
  } else {
    res
      .status(404)
      .json({ success: false, message: "No featured blogs found" });
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getSingleBlog,
  getAllBlogs,
  getFeaturedBlogs,
};
