const asyncHandler = require('express-async-handler')
const Thread = require('../models/threadModel')
const Post = require('../models/postModel')
const awsHelper = require('../controllers/awsBucketController')


// @desc    Get all threads
// @route   GET /api/threads
const getThreads = asyncHandler(async (req, res) => {
    const threads = await Thread.find();
    res.status(200).json(threads)
})


// @desc    create thread, if there are already 10 threads, delete the oldest thread + contained posts 
// and any associated files being stored in the s3 bucket
// @route   POST /api/threads
// @req     {threadText: String or threadImage: String}
const setThread = asyncHandler(async (req, res) => {
    let selectedThreadImage = null;

    // thread must have text or image contents
    if (!req.body.threadText){
        if (!req.body.threadImage){
            res.status(400) 
            throw new Error('ENTER THREAD TEXT OR IMAGE')
        }
    }

    const allThreads = await Thread.find()

    // if the thread limit is reached then delete the oldest thread + associated content
    if (allThreads.length + 1 > 10){
        await Thread.remove({threadID: allThreads[0].threadID})

        // if the thread has an image remove it from the s3 bucket
        if (allThreads[0].threadImage != null ){
            awsHelper.deleteBucketItem( allThreads[0].threadImage.replace(process.env.CLOUDFRONT_URL, "") )
        }
       
        // get all posts with that thread id
        const allPosts = await Post.find({inThread: allThreads[0].threadID})

        // remove every post image/file from s3 bucket
        allPosts.map((post) => {
            if (post.selectedFile != null){
                awsHelper.deleteBucketItem( post.selectedFile.replace(process.env.CLOUDFRONT_URL, ""))
            }
        })
        
        // delete posts from mongodb
        await Post.remove({inThread: allThreads[0].threadID})
    }


    // create the new thread
    if (req.body.threadImage != null){
        awsHelper.addThreadImageToBucket(req.body.threadImage, process.env.THREADCOUNT)
        selectedThreadImage = `${process.env.CLOUDFRONT_URL}thread${process.env.THREADCOUNT}.png`
    }
    
    const thread = await Thread.create({
        threadText: req.body.threadText,
        threadImage: selectedThreadImage,
        threadID: process.env.THREADCOUNT
    })

    process.env.THREADCOUNT = (parseInt(process.env.THREADCOUNT) + 1).toString()
    res.status(200).json(thread)
})


// not used could remove
// @desc    delete thread and contained posts
// @route   DELETE /api/threads
// @req     {id:  Integer} 
const deleteThread = asyncHandler(async (req,res) => {

    if (!req.body.id){
        res.status(400)
        throw new Error('ENTER THREAD ID TO DELETE')
    }

    // find stuff to delete
    const thread = await Thread.find({threadID: req.body.id})
    const posts = await Post.find({inThread: req.body.id})
    
    // TODO add s3 object removal

    // delete stuff from mongodb
    thread.remove()
    posts.remove()

    res.status(200).json({message: "THREAD AND CONTAINED POSTS REMOVED", threadID: req.body.id})
} )

module.exports = {getThreads, setThread, deleteThread}