
const Favorite = require("../models/Favorite");

// Add a favorite for the logged-in user
const addFavorite = async (req, res) => {
  try {
    const { destination } = req.body;
    const user = req.user.userId;

    const favorite = await Favorite.create({
      user,
      destination
    });

    res.status(201).json(favorite);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Destination already in favorites"
      });
    }

    res.status(400).json({ message: error.message });
  }
};

// Get favorites of the logged-in user
const getUserFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.user.userId
    }).populate("destination");

    res.status(200).json(favorites);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a favorite belonging to the logged-in user
const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite not found"
      });
    }

    res.status(200).json({
      message: "Favorite removed successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addFavorite,
  getUserFavorites,
  removeFavorite
};
