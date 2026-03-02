const mongoose = require("mongoose");

const advisorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true }, // e.g. "jane-doe"
    title: { type: String, default: "", trim: true }, // e.g. "Career Coach", "Senior SWE"
    bio: { type: String, default: "" },
    specialties: { type: [String], default: [] }, // e.g. ["Interview prep", "Portfolio reviews"]
    avatarUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Advisor", advisorSchema);