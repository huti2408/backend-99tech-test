import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortContent: { type: String },
    fullContent: { type: String, required: true },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false, select: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    author: { type: mongoose.Types.ObjectId, ref: "User" }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog
