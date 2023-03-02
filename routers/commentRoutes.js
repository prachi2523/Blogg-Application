const comment = require('../controllers/commentController')
const express = require('express')
const router = express.Router()

router.post('/add/:userId/:blogId', comment.addComment)

module.exports = router
