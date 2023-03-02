const blog = require('../controllers/blogController');
const express = require('express')
const router = express.Router();
const auth = require('../middlewares/authMiddleware')
const { upload } = require('../middlewares/imageStorage')
const validation = require('../validation/blog/blogValidation')

router.post('/add/:id',
    validation.addBlogValidation,
    auth.checkAuth,
    upload.single('uploadImage'),
    blog.addBlog)
router.get('/list', blog.listBlog)
router.get('/details/:id', blog.detailBlog)
router.post('/like/:id', blog.blogLike)
router.post('/search', validation.searchBlogValidation, blog.searchBlog)
router.post('/myblog/:id', auth.checkAuth, blog.UserBlog)
router.delete('/delete/:id', auth.checkAuth, blog.deleteBlog)
router.patch('/update/:id', auth.checkAuth, blog.updateBlog)

module.exports = router
