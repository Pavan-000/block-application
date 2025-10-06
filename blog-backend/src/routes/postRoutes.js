import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createPost,
  likePost,
  unlikePost,
  getAllPosts,
  getFollowingPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", protect, createPost);
router.put("/:id/like", protect, likePost);
router.put("/:id/unlike", protect, unlikePost);
router.get("/all", protect, getAllPosts);
router.get("/following", protect, getFollowingPosts);

export default router;
