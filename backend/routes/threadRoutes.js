const express = require('express')
const router = express.Router()

const { getThreads, setThread, deleteThread } = require('../controllers/threadController.js')

router.get('/', getThreads)
router.post('/', setThread)
router.delete('/', deleteThread)

module.exports = router