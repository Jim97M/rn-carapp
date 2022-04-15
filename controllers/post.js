const Post = require('../models/post');
const Comment = require('../models/post');
const User = require('../models/user');
const mongoose = require('mongoose');
const roomController = require('../controllers/room');
const Remover = require('./functions/imageResizer');

exports.AddPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        const user = await User.findById(post.user).populate('user','name');
        if(!user){
            await Remover.RemoveImages(req.files);
            res.status(500).json("User ID does not exist");
        }else {
           const fileArray = await Remover.ResizeImage("posts/" + post._id + req.files);
           const updatedArray = fileArray.map((file) => {
               return {type: "image", name: file}
           })
           
           post.media = updatedArray;
           post.save( async (err, data) => {
               if(!err){
                   res.status(200).json("Posted Successfully");
               }
               console.log(err);
               res.status(500).json("Falied To Post");
               await Remover.RemoveImages(req.files);
           })
        }

    } catch (error) {
        console.log(error);
        await Remover.RemoveImages(req.files);
        res.status(500).json({ "type": "failure", "result": "Server Not Responding" });
    }
}


exports.GetPost = async (req, res) => {
    try {
        const post = await Post.findById(req.query.postId);
        res.status(200).json({ type: "success", result: post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ type: "failure", result: "Server nNt Responding" })
    }
}

exports.GetPosts = async (req, res) => {
    try {
        const userId = req.query.userId;
        // const posts = await Post.find({}).populate('user', 'name image').sort([["createdAt", -1]]).limit(20);
        const posts = await Post.aggregate([
            {
                $addFields: {
                    isliked: { $in: [mongoose.Types.ObjectId(userId), "$likes"] },
                    totalLikes: { $size: ["$likes"] }
                }
            },
            {
                $lookup: {
                    from: 'users', localField: 'user', foreignField: '_id', as: 'user'
                }
            },
            {
                $project: {
                    likes: false
                }
            },
            { $unwind: '$user' },
            { $sort: { createdAt: -1 } },
            { $limit: 20 }
        ]);
        res.status(200).json({ "type": "success", "result": posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "type": "failure", "result": "Server Not Responding" });
    }
}
