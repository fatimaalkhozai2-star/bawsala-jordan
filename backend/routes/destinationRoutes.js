
const express = require("express");
const router = express.Router();

const {
  getAllDestinations,
  createDestination,
  getDestinationById,
  updateDestination,
    deleteDestination

} = require("../controllers/destinationController");

router.get("/", getAllDestinations);
router.post("/", createDestination);
router.get("/:id", getDestinationById);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);
module.exports = router;
