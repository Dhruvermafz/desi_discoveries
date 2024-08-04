const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const paragraphSchema = new mongoose.Schema({
  content: { type: String, required: true },
  image: { type: String }, // URL to the uploaded image
});

const metaFieldSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  attribute: { type: String, required: true },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, maxlength: 250, required: true },
  tags: { type: [String], default: [] },
  categories: { type: [String], default: [] },
  bannerImage: { type: String }, // URL to the banner image
  paragraphs: { type: [paragraphSchema], default: [] },
  metaFields: { type: [metaFieldSchema], default: [] },
  featured: { type: Boolean, default: false },
  metaTitle: { type: String },
  metaDescription: { type: String },
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

blogSchema.plugin(mongoosePaginate);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
