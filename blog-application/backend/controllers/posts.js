const Posts = require('../models/posts');
const User = require('../models/user');

require('dotenv').config();

exports.createPost = async(req,res) => {
    try{
        const {title, content} = req.body;
        const userId = req.user.id;
        if(!title || !content){
            return res.status(403).json({
                success:false,
                message:'Please Fill up All the Required Fields'
            })
        }
    
        const newPost = await Posts.create({title, content, user:userId});
    
        await User.findByIdAndUpdate({_id: userId}, {$push: {posts: newPost._id}}, {new: true});
        return res.status(200).json({
            success:true,
            message:'Post created successfully',
            data:newPost,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Post',
            error:error.message
        })
    }
}

exports.getAllPosts = async (req,res) => {
    try{
        const allPosts = await Posts.find().populate('user', 'username email').exec();
        return res.status(200).json({
            success:true,
            message:'All Posts are retrieved successfully',
            data: allPosts
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Cannot fetch all posts',
            error:error.message
        })
    }
}

exports.getUserPosts = async (req,res) => {
    try{
        const userId = req.user.id;
        const userPosts = await Posts.find({user: userId});
        return res.status(200).json({
            success:true,
            message:'All user posts are retrieved successfully',
            data: userPosts
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Cannot fetch user posts',
            error:error.message
        })
    }
} 

exports.getUserPostsById = async (req,res) => {
    try{
        const { id } = req.params;
        const posts = await User.findById(id).populate('posts');
        console.log("User ke post: ", posts);
        if(!posts){
            return res.status(404).json({
                success:false,
                message:'user posts not found',
            })
        }
        return res.status(200).json({
            success:true,
            message:'user posts are retrieved successfully',
            user: posts,
            data: posts.posts
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Cannot fetch user posts',
            error:error.message
        })
    }
} 

exports.deleteUserPost = async (req,res) => {
    try{
        const {postId} = req.body;
        const post = await Posts.findOne({_id: postId});
        if(!post){
            res.status(404).json({
                success:false,
                message:'Post not found',
            })
        }
        const userId = post?.user;
        const user = await User.findByIdAndUpdate(userId, {$pull: {posts: postId}});
        await Posts.findByIdAndDelete(postId);
        res.status(200).json({
            success:true,
            message:'Post deleted successfully',
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Cannot delete user posts',
            error:error.message
        })
    }
}

exports.updateUserPost = async(req,res) => {
    try{
        const { postId } = req.params;
        const updates = req.body;
        const post = await Posts.findOne({_id: postId}); 
        if(!post){
            res.status(404).json({
                success:false,
                message:'Post not found',
                error:error.message
            })
        }
        for(const key in updates){
            post[key] = updates[key]
        }
        await post.save();
        res.json({
            success: true,
            message: "Post updated successfully",
            data: post,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Cannot update user posts',
            error:error.message
        })
    }
}

exports.getPostById = async (req,res) => {
    try{
        const { id } = req.params;
        const post = await Posts.findById(id).populate('user', 'username email').exec();
        if(!post){
            return res.status(404).json({
                success:false,
                message:'Post not found',
            })
        }
        return res.status(200).json({
            success:true,
            message:'Post is retrieved successfully',
            data: post
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Cannot fetch the post',
            error:error.message
        })
    }
}
