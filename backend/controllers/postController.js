// dont need try or catches now cause of this
const asyncHandler = require('express-async-handler');
// Post schema/model
const Post = require('../models/postModel')


const awsHelper = require('../controllers/awsBucketController')

// feels like i should have to import env here but it works without it?

// @desc    Get all posts
// @route   GET /api/posts
const getPosts = asyncHandler(async (req, res) => {

    const posts = await Post.find(); // need await here or
    res.status(200).json(posts)
})


// @desc    create a post
// @route   POST /api/posts
// @req     {inThread: Number, postText: String, ~selectedFile: base64 image}
const setPost = asyncHandler(async (req, res) => {
    if (!req.body.postText){
        res.status(400)
        throw new Error('ENTER POST TEXT')
    }

    if ( !(req.body.inThread || req.body.inThread === 0) ){
        res.status(400)
        throw new Error('ENTER POST THREAD NUMBER')
    }

    
    // create image in aws bucket
    // generate url based on postID and cloudfront url
    // set url toselected file
    awsHelper.addPostImageToBucket( req.body.selectedFile || null, process.env.POSTCOUNT)


    const post = await Post.create({
        postID: process.env.POSTCOUNT,
        inThread: req.body.inThread,
        postText: req.body.postText,
        selectedFile: `${process.env.CLOUDFRONT_URL}post${process.env.POSTCOUNT}.png` || null
    })

    process.env.POSTCOUNT = (parseInt(process.env.POSTCOUNT) + 1).toString()
    res.status(200).json(post)
})


// @desc    remove post
// @route   DELETE /api/posts
// @req     {id: Number}
const deletePost = asyncHandler(async (req, res) => {
    // when sending postman requests use raw json not x-www-form-urlencoded

    if ( !(req.body.id || req.body.id === 0) ){
        res.status(400)
        throw new Error('ENTER ID OF POST TO DELETE')
    }

    await Post.remove({postID: req.body.id})

    res.status(200).json({message: "POST REMOVED", id: req.body.id})
})


module.exports = {getPosts, setPost, deletePost}