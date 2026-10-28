const express = require("express");
const router = express.Router();

const {
  addFavorite,
  getUserFavorites,
  removeFavorite
} = require("../controllers/favoriteController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addFavorite);
router.get("/", protect, getUserFavorites);
router.delete("/:id", protect, removeFavorite);

module.exports = router;