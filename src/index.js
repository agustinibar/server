import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from "morgan";
import path from 'path';
import { fileURLToPath } from 'url';
import router from '../src/routes/index.js'
import User from './models/User.js';
import Post from './models/Posts.js';
import { users, posts } from './data/index.js';

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
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));

 //use router
 app.use(router);


 //mongodb config

const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`))

    // User.insertMany(users);
    // Post.insertMany(posts)
})
.catch((error)=> console.log(`${error} did not connect`));
