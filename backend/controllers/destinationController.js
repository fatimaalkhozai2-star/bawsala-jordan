
const Destination = require("../models/Destination");

// Get all destinations with search, filters and pagination
const getAllDestinations = async (req, res) => {
  try {
    const {
      search,
      governorate,
      category,
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    // Search in English and Arabic
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { nameAr: { $regex: search, $options: "i" } }
      ];
    }

    // Filter by governorate in both languages
    if (governorate) {
      filter.$and = [
        ...(filter.$and || []),
        {
          $or: [
            { governorate: { $regex: `^${governorate}$`, $options: "i" } },
            { governorateAr: governorate }
          ]
        }
      ];
    }

    // Filter by category in both languages
    if (category) {
      filter.$and = [
        ...(filter.$and || []),
        {
          $or: [
            { category: { $regex: `^${category}$`, $options: "i" } },
            { categoryAr: category }
          ]
        }
      ];
    }

    const currentPage = Math.max(1, Number(page) || 1);
    const pageLimit = Math.max(1, Number(limit) || 10);

    const destinations = await Destination.find(filter)
      .skip((currentPage - 1) * pageLimit)
      .limit(pageLimit);

    const total = await Destination.countDocuments(filter);

    res.status(200).json({
      total,
      page: currentPage,
      totalPages: Math.ceil(total / pageLimit),
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


// Get destination by ID
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


// Update destination
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


// Delete destination
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
