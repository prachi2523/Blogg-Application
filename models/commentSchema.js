const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
    },
    isActive: {
        type: Boolean,
        default: true
    }
})
commentSchema.set('timestamps', true)
module.exports = mongoose.model('comment', commentSchema)
