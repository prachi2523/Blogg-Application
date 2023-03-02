const users = require('../controllers/userController')
const express = require('express')
const router = express.Router()
const { upload } = require('../middlewares/imageStorage')
const validation = require('../validation/user/userValidation')

router.post('/signup', upload.single('profilePic'), validation.createUservalidation, users.signUp)
router.post('/signin', users.signIn)
router.post('/emailforpasswordreset', users.emailForResetPass)
router.post('/resetUserpassword/:id/:token', users.resetPassword)

module.exports = router
