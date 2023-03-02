const commentSchema = require('../models/commentSchema')

//Add comment API
const addComment = async (req, res) => {
    try {
        const userId=req.params.userId
        const blogId=req.params.blogId
        const comment = await new commentSchema(req.body)
        comment.userId = userId
        comment.blogId = blogId
          await comment.populate({
                path: "userId",
                select: "FullName profilePic"
            })
        await comment.save();
        res.status(201).json({
            success: "success",
            message: "comment added successfulyy",
            data: comment
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: err.message
        })
    }
}

module.exports = { addComment }
