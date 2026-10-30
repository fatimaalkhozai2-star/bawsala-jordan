
const mongoose = require("mongoose");

// Activity Schema
const activitySchema = new mongoose.Schema({
  name: { type: String, trim: true },
  nameAr: { type: String, trim: true },
  description: { type: String, trim: true },
  descriptionAr: { type: String, trim: true }
});

// Nearby Place Schema
const nearbyPlaceSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  nameAr: { type: String, trim: true, default: "" },
  description: { type: String, trim: true, default: "" },
  descriptionAr: { type: String, trim: true, default: "" },
  address: { type: String, trim: true, default: "" },
  addressAr: { type: String, trim: true, default: "" },
  imageUrl: { type: String, trim: true, default: "" },
  mapsUrl: { type: String, trim: true, default: "" },
  websiteUrl: { type: String, trim: true, default: "" }
});

// Destination Schema
const destinationSchema = new mongoose.Schema(
  {
    // Basic Information
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    governorate: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },

    // Arabic Information
    nameAr: { type: String, trim: true, default: "" },
    descriptionAr: { type: String, trim: true, default: "" },
    governorateAr: { type: String, trim: true, default: "" },
    areaAr: { type: String, trim: true, default: "" },
    categoryAr: { type: String, trim: true, default: "" },

    // Main Image
    imageUrl: { type: String, required: true, trim: true },

    // History
    history: { type: String, trim: true, default: "" },
    historyAr: { type: String, trim: true, default: "" },

    // Activities
    activities: {
      type: [activitySchema],
      default: []
    },

    // Nearby Restaurants
    restaurants: {
      type: [nearbyPlaceSchema],
      default: []
    },

    // Nearby Hotels
    hotels: {
      type: [nearbyPlaceSchema],
      default: []
    },

    // Map Coordinates
    location: {
      latitude: { type: Number },
      longitude: { type: Number }
    }
  },
  {
    timestamps: true
  }
);

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
