import Post from '../models/Posts.js';
import User from '../models/User.js';
import { v2 as cloudinary } from 'cloudinary'; 

    cloudinary.config({
        cloud_name: 'dznlsgy6h', 
        api_key: '969128831313338', 
        api_secret: 'qg8yaHi5_Dml3J4dp2nCQ5Ry1Xo' 
    });
    
export const createPost = async(req, res)=>{ 
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);

        const uploadedImage = await cloudinary.uploader.upl

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath: picturePath,
            likes: {},
            comments: []
        });

        await newPost.save();
        
        const post = await Post.find();

        res.status(201).json(post);

    } catch (error) {
        res.status(409).json({ message: error.message })
    };
};

export const getFeedPosts = async(req, res)=>{ 
    try {
        const post = await Post.find();

        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({ message: error.message })
    };
};

export const getUserPost = async(req, res)=>{ 
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId });

        res.status(200).json(posts);
    } catch (error) {
        res.status(409).json({ message: error.message })
    };
};

export const likePost = async(req, res)=>{ 
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        };

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    };
};
