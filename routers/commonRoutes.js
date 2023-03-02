const userRoute = require('./userRoutes')
const blogRoute = require('./blogRoutes')
const express = require('express')
const router = express.Router()
const commentRoute = require('./commentRoutes')

router.use('/user', userRoute)
router.use('/blog', blogRoute)
router.use('/comment', commentRoute)

module.exports = router
