import bcrypt from 'bcrypt'
import User from '../models/User.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dznlsgy6h',
    api_key: '969128831313338',
    api_secret: 'qg8yaHi5_Dml3J4dp2nCQ5Ry1Xo',
  });

export const register = async(req, res)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            friends,
            location,
            occupation,
        } = req.body;
        
        // const picturePath =  req.file.path; 

        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads',
          });
      
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath: uploadedImage.secure_url,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




