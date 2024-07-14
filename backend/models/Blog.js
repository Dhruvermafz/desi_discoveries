const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, maxlength: 100 }, // Limiting excerpt to 100 characters
  tags: { type: [String], default: [] },
  categories: { type: [String], default: [] },
  images: { type: [String], default: [] }, // Adding images as an array
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

blogSchema.plugin(mongoosePaginate);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
