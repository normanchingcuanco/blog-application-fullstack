const Page = require("../models/Page");

/* ================= GET PAGE (PUBLIC) =================
   GET /api/pages/:slug
*/
exports.getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const page = await Page.findOne({
      slug: slug.toLowerCase().trim()
    }).populate("updatedBy", "username email");

    if (!page) {
      return res.status(404).json({ message: "Page not found." });
    }

    res.json(page);
  } catch (error) {
    console.error("Get Page Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/* ================= UPSERT PAGE (ADMIN) =================
   PUT /api/pages/:slug
   Body: { title, content, videoUrl }
*/
exports.upsertPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, videoUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required."
      });
    }

    const updated = await Page.findOneAndUpdate(
      { slug: slug.toLowerCase().trim() },
      {
        slug: slug.toLowerCase().trim(),
        title: title.trim(),
        content,
        videoUrl: videoUrl || "",
        updatedBy: req.user.id
      },
      {
        upsert: true,
        returnDocument: "after"
      }
    ).populate("updatedBy", "username email");

    res.json(updated);

  } catch (error) {
    console.error("Upsert Page Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};