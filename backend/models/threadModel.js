const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
    threadText: {
        type: String,
        required: [true, 'add thread text'],
    },
    threadImage: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    threadID: {
        type: Number,
        required: [true, 'add a thread ID'],
    },
})

module.exports = mongoose.model('thread', threadSchema)