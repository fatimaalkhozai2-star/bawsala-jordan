
const express = require("express");
const router = express.Router();

const {
  getAllDestinations,
  createDestination
} = require("../controllers/destinationController");

router.get("/", getAllDestinations);
router.post("/", createDestination);

module.exports = router;
