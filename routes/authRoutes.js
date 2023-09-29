import { Router } from "express";
import { login } from "../controllers/login.js";


export const authRouter = Router();


 authRouter.post('/login', login)
 