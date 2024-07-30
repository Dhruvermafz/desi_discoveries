const express = require("express");
const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

// Create a new blog
const createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    excerpt,
    tags,
    categories,
    featured,
    permalink,
    metaTitle,
    metaDescription,
    intro,
    published,
  } = req.body;

  try {
    // Handle banner image upload
    let bannerImageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });
      bannerImageUrl = result.secure_url;
    }

    // Handle paragraph images upload
    const paragraphImages = [];
    if (req.files.paragraphImages) {
      for (const file of req.files.paragraphImages) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "blogs",
        });
        paragraphImages.push(result.secure_url);
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
      permalink,
      metaTitle,
      metaDescription,
      intro,
      published,
      bannerImage: bannerImageUrl,
      paragraphs: req.body.paragraphs.map((para, index) => ({
        ...para,
        image: paragraphImages[index] || "",
      })),
    });

    // Clean up uploaded files
    req.files.forEach((file) => fs.unlinkSync(file.path));

    res.status(201).json(newBlog);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create blog", error: error.message });
  }
});

// Update an existing blog
const updateBlog = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    excerpt,
    tags,
    categories,
    featured,
    permalink,
    metaTitle,
    metaDescription,
    intro,
    published,
    paragraphs,
  } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title,
      content,
      excerpt,
      tags,
      categories,
      featured,
      permalink,
      metaTitle,
      metaDescription,
      intro,
      published,
      paragraphs,
    },
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

  // Remove the banner image from Cloudinary if it exists
  if (blog.bannerImage) {
    const publicId = blog.bannerImage.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`blogs/${publicId}`);
  }

  // Remove paragraph images from Cloudinary
  blog.paragraphs.forEach(async (para) => {
    if (para.image) {
      const publicId = para.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`blogs/${publicId}`);
    }
  });

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
