import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { createPost, getFeedPosts, getUserPost, likePost } from "../controllers/posts.js";
import multer from "multer";

export const postRouter = Router();


postRouter.get('/', verifyToken, getFeedPosts);
postRouter.get('/:userId/posts');

postRouter.patch('/:id/like', verifyToken, likePost);



