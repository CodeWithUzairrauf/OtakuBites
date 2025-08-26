// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/postController");

// Create post (communityId in body)
router.post("/", protect, ctrl.createPost);

// List all posts in a community
router.get("/community/:communityId", ctrl.listPosts);

// Single post
router.get("/:postId", ctrl.getPost);
router.delete("/:postId", protect, ctrl.deletePost);
router.post("/:postId/vote", protect, ctrl.votePost);

module.exports = router;