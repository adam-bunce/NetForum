const express = require('express')
const router = express.Router()

const { getPosts, setPost, deletePost } = require('../controllers/postController.js')

router.get('/', getPosts)
router.post('/', setPost)
router.delete('/', deletePost)

module.exports = router