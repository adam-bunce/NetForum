// dont need try or catches now cause of this
const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv').config()

// post schema/model
const Post = require('../models/postModel')

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private~?
const getPosts = asyncHandler(async (req, res) => {

    const posts = await Post.find(); // need await here or
    res.status(200).json(posts)
})

// @desc    create a post
// @route   POST /api/posts
// @access  Private~?
const setPost = asyncHandler(async (req, res) => {
    //const goals = await Goal.find({user: req.user.id})
    
    if (!req.body.postText){
        res.status(400)
        throw new Error('please enter post text')
    }

    const post = await Post.create({
        postID: process.env.POSTCOUNT,
        postText: req.body.postText,
        selectedFile: req.body.selectedFile || null
    })


    // increase post ID count after new post has been created
    process.env.POSTCOUNT = (parseInt(process.env.POSTCOUNT) + 1).toString()

    res.status(200).json(post)
})

//TODO make it so only an admin account can delete posts 
// ( i guess i can do it through postman but thats not ideal)

// @desc    remove post
// @route   DELETE /api/posts
// @access  Private~?
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.body.id)

    await post.remove()

    res.status(200).json({message: 'POST REMOVED'})
})


module.exports = {getPosts, setPost, deletePost}