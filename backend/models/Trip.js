
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  destinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
