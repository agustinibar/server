import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from "morgan";
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/index.js'
import User from './models/User.js';
import Post from './models/Posts.js';
import { users, posts } from './data/index.js';
import { createPost } from './controllers/posts.js';
import { register } from './controllers/register.js';
import multer from 'multer';
import { verifyToken } from './middleware/auth.js';

//server config

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("dev"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
app.use(cors({
    origin:  ['http://localhost:3000', 'https://foodiesitelab.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });
  
  /* ROUTES WITH FILES */
  app.post("/auth/register", upload.single("picture"), register);
  app.post("/post", verifyToken, upload.single("picture"), createPost);

 //use router
 app.use(router);


 //mongodb config

const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`))
})
.catch((error)=> console.log(`${error} did not connect`));
