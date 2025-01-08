import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortContent: { type: String, required: true },
    fullContent: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog
