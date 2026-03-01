const Comment = require("../models/Comment");
const Post = require("../models/Post");

/* ================= CREATE COMMENT ================= */
exports.createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const postId = req.params.postId;

        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        const newComment = new Comment({
            content,
            author: req.user.id,
            post: postId
        });

        const savedComment = await newComment.save();

        res.status(201).json(savedComment);

    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};


/* ================= GET COMMENTS BY POST ================= */
exports.getCommentsByPost = async (req, res) => {
    try {
        const postId = req.params.postId;

        const comments = await Comment.find({ post: postId })
            .populate("author", "username email")
            .sort({ createdAt: -1 });

        res.json(comments);

    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};


/* ================= DELETE COMMENT ================= */
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        // Only comment author OR admin can delete
        if (comment.author.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: "Not authorized." });
        }

        await comment.deleteOne();

        res.json({ message: "Comment deleted successfully." });

    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};