import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const post = await Post.create({ content: req.body.content, author: req.user._id });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.likes.includes(req.user._id)) post.likes.push(req.user._id);
    await post.save();

    res.json({ message: "Liked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.likes = post.likes.filter((id) => id.toString() !== req.user._id.toString());
    await post.save();

    res.json({ message: "Unliked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username name").sort({ createdAt: -1 });
  res.json(posts);
};

export const getFollowingPosts = async (req, res) => {
  const followingIds = req.user.following;
  const posts = await Post.find({ author: { $in: followingIds } })
    .populate("author", "username name")
    .sort({ createdAt: -1 });
  res.json(posts);
};
