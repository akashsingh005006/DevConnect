const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createRoom, getRooms,} = require("../controllers/roomController");

const router = express.Router();
router.get("/", getRooms);
router.post("/", protect, createRoom);

module.exports = router;