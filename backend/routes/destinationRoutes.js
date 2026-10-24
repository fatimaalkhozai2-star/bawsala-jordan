
const express = require("express");
const router = express.Router();

const {
  getAllDestinations,
  createDestination,
  getDestinationById
} = require("../controllers/destinationController");

router.get("/", getAllDestinations);
router.post("/", createDestination);
router.get("/:id", getDestinationById);

module.exports = router;
//6adc6c477e1de5a35f03223e