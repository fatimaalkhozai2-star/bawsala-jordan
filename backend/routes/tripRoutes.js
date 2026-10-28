
const express = require("express");
const router = express.Router();

const {
  getAllTrips,
  createTrip,
  getTripById,
  updateTrip,
  deleteTrip
} = require("../controllers/tripController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAllTrips);
router.post("/", protect, createTrip);
router.get("/:id", protect, getTripById);
router.put("/:id", protect, updateTrip);
router.delete("/:id", protect, deleteTrip);

module.exports = router;
