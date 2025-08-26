const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/commentController");

// Comments for a post
router.get("/:postId/comments", ctrl.getComments);
router.post("/:postId/comments", protect, ctrl.createComment);
router.delete("/comments/:commentId", protect, ctrl.deleteComment);

module.exports = router;