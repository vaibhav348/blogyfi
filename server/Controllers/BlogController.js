const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  const { title, content, author,profileImage, tags, thumbnail, publicId } = req.body;
  try {
    if (!title || !content || !author || !profileImage|| !tags || !thumbnail || !publicId) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    let blog = await Blog.create({
      title,
      content,
      author,
      profileImage,
      tags,
      thumbnail,
      publicId,
    });
    await blog.save();
    return res.status(201).json({ success: true, message: "Blog Created" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find().sort({ createdAt: -1 });
    if (!blogs) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found" });
    }
    return res
      .status(200)
      .json({ success: true, blogs, message: "All blogs fetched" });
  } catch (error) {
    return res.status(500).json({ success: false, messsage: error.messsage });
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    let blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Blog fetched", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getBlogsByAuthor = async (req, res) => {
  const { owner } = req.params; // Get the owner from params
  const escapedOwner = owner.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters for regex

  try {
    let blogs = await Blog.find({
      author: { $regex: `\\b${escapedOwner}\\b`, $options: 'i' } // Match whole word in author
    });

    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found matching the author" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blogs fetched", blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogsByKeyword = async (req, res) => {
  const { keyword } = req.params; // Get the keyword from params
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters for regex

  try {
    let blogs = await Blog.find({
      $or: [
        { title: { $regex: `\\b${escapedKeyword}\\b`, $options: 'i' } }, // Match whole word in title
        { content: { $regex: `\\b${escapedKeyword}\\b`, $options: 'i' } }, // Match whole word in content
        { author: { $regex: `\\b${escapedKeyword}\\b`, $options: 'i' } }, // Match whole word in author
        { tags: { $elemMatch: { $regex: `\\b${escapedKeyword}\\b`, $options: 'i' } } } // Match whole word in tags (assuming tags is an array of strings)
      ]
    });

    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found matching the keyword" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blogs fetched", blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { createBlog, getAllBlogs, getBlogById,getBlogsByKeyword ,getBlogsByAuthor};