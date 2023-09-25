import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { createPost, getFeedPosts, getUserPost, likePost } from "../controllers/posts.js";
import multer from "multer";

export const postRouter = Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/assets');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
 });

const upload = multer({ storage });

postRouter.get('/', verifyToken, getFeedPosts);
postRouter.get('/:userId/posts');

postRouter.patch('/:id/like', verifyToken, likePost);

postRouter.post('/create', verifyToken, upload.single("picture"), createPost);

