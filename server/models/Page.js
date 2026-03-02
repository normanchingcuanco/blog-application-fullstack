const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true }, // e.g. "about", "start-here"
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true }, // store as markdown or rich text later
    videoUrl: { type: String, default: "" }, // optional: YouTube link for About page intro, etc.
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);