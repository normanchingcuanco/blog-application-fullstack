const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { verifyToken } = require("../middleware/authMiddleware");

// Create comment for a specific post
router.post("/:postId", verifyToken, commentController.createComment);

// Get comments for a specific post
router.get("/:postId", commentController.getCommentsByPost);

// Delete comment
router.delete("/:id", verifyToken, commentController.deleteComment);

module.exports = router;