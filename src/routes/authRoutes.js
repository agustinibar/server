import { Router } from "express";
import multer from 'multer';
import { register } from '../controllers/register.js'
import { login } from "../controllers/login.js";

export const authRoutes = Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/assets');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
 });

 const upload = multer({ storage });

 authRoutes.post('/register', upload.single('picture'), register);
 authRoutes.post('/login', login)
