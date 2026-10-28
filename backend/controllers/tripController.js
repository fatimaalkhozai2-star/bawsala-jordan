
const Trip = require("../models/Trip");

// Get trips belonging to the logged-in user
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user.userId
    });

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a trip for the logged-in user
const createTrip = async (req, res) => {
  try {
    const { title, destinations, startDate, endDate, notes } = req.body;

    const trip = await Trip.create({
      user: req.user.userId,
      title,
      destinations,
      startDate,
      endDate,
      notes
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get one trip only if it belongs to the logged-in user
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a trip only if it belongs to the logged-in user
const updateTrip = async (req, res) => {
  try {
    const { title, destinations, startDate, endDate, notes } = req.body;

const updates = {};

if (title !== undefined) updates.title = title;
if (destinations !== undefined) updates.destinations = destinations;
if (startDate !== undefined) updates.startDate = startDate;
if (endDate !== undefined) updates.endDate = endDate;
if (notes !== undefined) updates.notes = notes;

    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a trip only if it belongs to the logged-in user
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    res.status(200).json({
      message: "Trip deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllTrips,
  createTrip,
  getTripById,
  updateTrip,
  deleteTrip
};
