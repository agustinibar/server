import { Router } from "express";
import multer from 'multer';
import { register } from "../controllers/register.js";

const router = Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/assets');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
 });

 const upload = multer({ storage });

router.post('/auth/register', upload.single('picture'), register);


export default router;
