const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    postID: {
        type: Number,
        required: [true, 'add a post ID'],
        unique: true // r9k angle
    },
    postText: {
        type: String,
        required: [true, 'post needs text'],
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