
const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    // English - Default Language
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    governorate: {
      type: String,
      required: true,
      trim: true
    },

    area: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    // Arabic Translations
    nameAr: {
      type: String,
      trim: true,
      default: ""
    },

    descriptionAr: {
      type: String,
      trim: true,
      default: ""
    },

    governorateAr: {
      type: String,
      trim: true,
      default: ""
    },

    areaAr: {
      type: String,
      trim: true,
      default: ""
    },

    categoryAr: {
      type: String,
      trim: true,
      default: ""
    },

    // Destination Image
    imageUrl: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
