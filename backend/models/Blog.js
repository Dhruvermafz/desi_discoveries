const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

blogSchema.plugin(mongoosePaginate);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
