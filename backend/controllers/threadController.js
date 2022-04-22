const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv').config()

const Thread = require('../models/threadModel')
const Post = require('../models/postModel')




// @desc    Get all threads
// @route   GET /api/threads
const getThreads = asyncHandler(async (req, res) => {

    const threads = await Thread.find();
    res.status(200).json(threads)
})

// @desc    create thread, if there are already 10 threads, delete the oldest thread + contained posts
// @route   GET /api/threads
// @req     {threadText: String, threadImage: String}
const setThread = asyncHandler(async (req, res) => {
    
    if (!req.body.threadText){
        res.status(400)
        throw new Error('please enter thread text')
    }

    const allThreads = await Thread.find()

    if (allThreads.length + 1 > 10){
        // if there are more than 5 threads, with the addition of this new thread
        // remove the first index of the threads

        await Thread.remove({threadID: allThreads[0].threadID})

        // remove all posts in that thread
        await Post.remove({inThread: allThreads[0].threadID})
    }


    const thread = await Thread.create({
        threadText: req.body.threadText,
        threadImage: req.body.threadImage || null,
        threadID: process.env.THREADCOUNT
    })


    process.env.THREADCOUNT = (parseInt(process.env.THREADCOUNT) + 1).toString()

    res.status(200).json(thread)
})

// @desc    delete thread and contained posts
// @route   DELETE /api/threads
// @req     {id:  thread's id} 
const deleteThread = asyncHandler(async (req,res) => {

    // remoev thread with same thread id
    await Thread.findOneAndRemove({threadID: req.body.id})

    // remove all posts in that thread
    await Post.remove({inThread: req.body.id})

    res.status(200).json({message: "thread and contained posts removed", threadID: req.body.id})
} )

module.exports = {getThreads, setThread, deleteThread}