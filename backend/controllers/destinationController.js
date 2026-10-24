const Destination = require("../models/Destination");

const getAllDestinations = async (req, res) => {
  try {
    //console.log("getAllDestinations is running");
    //return res.status(200).json({ message: "NEW CONTROLLER WORKS" });
    const { search, governorate, category, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (governorate) {
      filter.governorate = governorate;
    }

    if (category) {
      filter.category = category;
    }

    const destinations = await Destination.find(filter)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Destination.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      destinations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new destination
const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found"
      });
    }

    res.status(200).json(destination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found"
      });
    }

    res.status(200).json(destination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a destination
const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found"
      });
    }

    res.status(200).json({
      message: "Destination deleted successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  getAllDestinations,
 createDestination,
 getDestinationById,
 updateDestination,
   deleteDestination



};