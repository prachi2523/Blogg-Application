const blog = require('./blogSchema')

module.exports = {
    addBlogValidation: async (req, res, next) => {
        const value = blog.addBlog.validate(req.body, { abortEarly: false });
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            });
        } else {
            next()
        }
    },
    searchBlogValidation: async (req, res, next) => {
        const value = blog.searchBlog.validate(req.body, { abortEarly: false });
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            });
        } else {
            next()
        }
    }
}
