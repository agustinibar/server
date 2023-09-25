import { Router } from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from '../controllers/users.js';
import { verifyToken } from "../middleware/auth.js";

export const usersRouter = Router();

usersRouter.get('/:id', verifyToken, getUser);
usersRouter.get('/:id/friends', verifyToken, getUserFriends);
usersRouter.patch('/:id/:friendId', verifyToken, addRemoveFriend);




