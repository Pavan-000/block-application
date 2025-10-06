import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { followUser, unfollowUser } from "../controllers/userController.js";

const router = express.Router();

router.put("/follow/:id", protect, followUser);
router.put("/unfollow/:id", protect, unfollowUser);

export default router;
