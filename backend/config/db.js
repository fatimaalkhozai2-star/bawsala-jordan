const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bawsala_jordan");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Connection failed:", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;