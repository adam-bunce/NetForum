const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv').config()

const Thread = require('../models/threadModel')

// @desc    Get all threads
// @route   GET /api/threads
const getThreads = asyncHandler(async (req, res) => {

    const threads = await Thread.find();
    res.status(200).json(threads)
})

// @desc    Get all threads
// @route   GET /api/threads
// @req     {threadText: String, threadImage: String}
const setThread = asyncHandler(async (req, res) => {
    
    if (!req.body.threadText){
        res.status(400)
        throw new Error('please enter thread text')
    }

    const thread = await Thread.create({
        threadText: req.body.threadText,
        threadImage: req.body.threadImage || null,
        threadID: process.env.THREADCOUNT
    })

    process.env.THREADCOUNT = (parseInt(process.env.THREADCOUNT) + 1).toString()

    res.status(200).json(thread)
})

// @desc    delete thread
// @route   DELETE /api/threads
// @req     {id: mongodb _id} 
const deleteThread = asyncHandler(async (req,res) => {
    const thread = await Thread.find(req.body.id)
    
    await thread.remove()

    res.status(200).json({message: 'THREAD REMOVED'})
} )

module.exports = {getThreads, setThread, deleteThread}