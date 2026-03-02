const express = require("express");
const router = express.Router();

const pageController = require("../controllers/pageController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Public
router.get("/:slug", pageController.getPageBySlug);

// Admin (upsert)
router.put("/:slug", verifyToken, verifyAdmin, pageController.upsertPageBySlug);

module.exports = router;