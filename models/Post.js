// models/Post.js
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, // HTML from React Quill
    slug: { type: String, required: true, unique: true }, // SEO-friendly URL
    image: { type: String },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
