const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createCommunity,
  getCommunities,
  joinCommunity,
  leaveCommunity,
} = require("../controllers/communityController");

router.post("/", protect, createCommunity);
router.get("/", getCommunities);
router.post("/:id/join", protect, joinCommunity);
router.post("/:id/leave", protect, leaveCommunity);

module.exports = router;