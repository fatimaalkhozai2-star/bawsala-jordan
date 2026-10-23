const { getAllDestinations } = require("../controllers/destinationController");
const express = require("express");
const router = express.Router();

router.get("/", getAllDestinations);

module.exports = router;