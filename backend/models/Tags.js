const mongoose = require("mongoose");
const TagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
});

module.exports = mongoose.model("Tags", TagSchema);
