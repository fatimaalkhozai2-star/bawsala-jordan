
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
  type: String,
  required: true,
  unique: true,
  trim: true,
  minlength: [2, "Category name must be at least 2 characters"]
},
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
