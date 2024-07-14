const express = require("express");
const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, tags, categories, featured } = req.body;

  try {
    // Upload images to Cloudinary
    let images = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "blogs",
        });
        images.push(result.secure_url);
      }
    }

    // Create a new blog
    const newBlog = await Blog.create({
      title,
      content,
      excerpt,
      tags,
      categories,
      featured,
      images,
    });

    res.status(201).json(newBlog);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create blog", error: error.message });
  }
});
// Update an existing blog
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, tags, categories, featured } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, content, excerpt, tags, categories, featured },
    { new: true }
  );

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

// Delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  // Remove the image from Cloudinary if it exists
  if (blog.image) {
    const publicId = blog.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`blogs/${publicId}`);
  }

  await blog.remove();
  res.status(200).json({ message: "Blog deleted successfully" });
});

module.exports = {
  createBlog,
  updateBlog,
  getSingleBlog,
  getAllBlogs,
  getFeaturedBlogs,
  deleteBlog,
};
