const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    postID: {
        type: Number,
        required: [true, 'add a post ID'],
    },
    postText: {
        type: String,
        required: [true, 'please add an email'],
        unique: true // r9k angle
    },
    selectedFile: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
)

// export the post schema
module.exports = mongoose.model('post', postSchema)