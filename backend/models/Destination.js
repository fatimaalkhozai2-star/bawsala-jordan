const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
      name: {
    type: String,
    required: true
  } ,

  description: {
  type: String,
  required: true
},
governorate: {
  type: String,
  required: true
},
area: {
  type: String,
  required: true
},
imageUrl: {
  type: String,
  required: true
},
category: {
  type: String,
  required: true
}
}, { timestamps: true });
const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;