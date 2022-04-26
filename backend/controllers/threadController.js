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
// @route   POST /api/threads
// @req     {threadText: String, ~threadImage: String}
const setThread = asyncHandler(async (req, res) => {
    if (!req.body.threadText){
        res.status(400)
        throw new Error('ENTER THREAD TEXT')
    }

    const allThreads = await Thread.find()

    if (allThreads.length + 1 > 10){
        await Thread.remove({threadID: allThreads[0].threadID})

        await Post.remove({inThread: allThreads[0].threadID})
    }

    awsHelper.addThreadImageToBucket(req.body.threadImage || null, process.env.THREADCOUNT)

    const thread = await Thread.create({
        threadText: req.body.threadText,
        threadImage: `${process.env.CLOUDFRONT_URL}thread${process.env.THREADCOUNT}.png` || null,
        threadID: process.env.THREADCOUNT
    })

    process.env.THREADCOUNT = (parseInt(process.env.THREADCOUNT) + 1).toString()
    res.status(200).json(thread)
})

// @desc    delete thread and contained posts
// @route   DELETE /api/threads
// @req     {id:  Integer} 
const deleteThread = asyncHandler(async (req,res) => {

    if (!req.body.id){
        res.status(400)
        throw new Error('ENTER THREAD ID TO DELETE')
    }

    await Thread.findOneAndRemove({threadID: req.body.id})
    await Post.remove({inThread: req.body.id})

    res.status(200).json({message: "THREAD AND CONTAINED POSTS REMOVED", threadID: req.body.id})
} )

module.exports = {getThreads, setThread, deleteThread}