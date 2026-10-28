
const express = require("express");
const router = express.Router();

const {
  getAllDestinations,
  createDestination,
  getDestinationById,
  updateDestination,
  deleteDestination
} = require("../controllers/destinationController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);

// Admin-only routes
router.post("/", protect, adminOnly, createDestination);
router.put("/:id", protect, adminOnly, updateDestination);
router.delete("/:id", protect, adminOnly, deleteDestination);

module.exports = router;
