import { Router } from "express";
import { register } from '../controllers/register.js'
import { login } from "../controllers/login.js";
import multer from 'multer';


export const authRouter = Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/assets');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
 });

const upload = multer({ storage });


 authRouter.post('/register', upload.single('picture'), register);
 authRouter.post('/login', login)
 