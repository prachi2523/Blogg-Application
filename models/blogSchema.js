const { required } = require('joi')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    blogLike: {
        type: Number,
        default: 0
    },
    uploadImage: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        // required:true,
        ref: "user"
    },
    isActive: {
        type: Boolean,
    }
})
blogSchema.set('timestamps', true)
module.exports = mongoose.model('blog', blogSchema)
