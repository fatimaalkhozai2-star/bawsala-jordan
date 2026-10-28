const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
     name: {
  type: String,
  required: true,
  trim: true,
  minlength: 2
},
email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
  match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]
},
role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
},
password: {
  type: String,
  required: true,
  minlength: 8,
  trim: false,
  validate: {
    validator: (value) => value.trim().length >= 8,
    message: "Password must contain at least 8 non-space characters"
  }
}
}, { timestamps: true });
const User = mongoose.model("User", userSchema);

module.exports = User;
