const blogSchema = require('../models/blogSchema')
const commentSchema = require('../models/commentSchema')
const userModelSchema = require('../models/userModelSchema')

//Add Blog API
const addBlog = async (req, res) => {
    const newBlog = new blogSchema(req.body)
    newBlog.userId = req.params.id
    const filepath = `/uploads/${req.file.filename}`
    newBlog.uploadImage = filepath
    try {
        await newBlog.save()
        res.status(201).json({
            success: "success",
            message: "blog added successfully"
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: "error ocuured " + err
        })
    }
}

//List all blog API
const listBlog = async (req, res) => {
    try {
        const blogList = await blogSchema.find();
        if (blogList) {
            res.status(200).json({
                success: "success",
                data: blogList
            })
        } else {
            res.status(404).json({
                success: "failure",
                message: "No blog found"
            })
        }
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: "error occured " + err.message
        })
    }
}

//Detail Blog API
const detailBlog = async (req, res) => {
    try {
        const blogDetail = await commentSchema.findOne({blogId:req.params.id})
        .populate({
                path: "userId",
                select: "FullName profilePic city"
            })
        .populate({
            path:"blogId",
            select:"title description blogLike"
        })
        res.status(200).json({
            success: "success",
            blog: blogDetail
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: "erro occured " + err.message
        })
    }
}

//Blog Like API
const blogLike = async (req, res) => {
    try {
        const { blogLike } = req.body
        const blog = await blogSchema.findById(req.params.id)
        if (blog) {
            if (blogLike == true) {
                await blog.updateOne({ $set: { blogLike: ++blog.blogLike } })
                res.status(202).json({
                    success: "success",
                    message: "you just like this blog",
                    data: blog.blogLike
                })
            }
            else {
                await blog.updateOne({ $set: { blogLike: --blog.blogLike } })
                res.status(202).json({
                    success: "success",
                    message: "you just dislike this blog",
                    data: blog.blogLike
                })
            }
        }
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: "error occured " + err.message
        })
    }
}

//Search Blog API
const searchBlog = async (req, res) => {
    const { title } = req.body
    try {
        const query = { title: { $regex: title, $options: "i" } }
        const blogdetail = await blogSchema.find(query)
        if (blogdetail) {
            res.status(200).json({
                success: "success",
                data: blogdetail
            })
        } else {
            res.status(400).json({
                success: "failure",
                message: "No blog found"
            })
        }
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: err.message + " erro occured"
        })
    }
}

//User Blog API
const UserBlog = async (req, res) => {
    const _id = req.params.id
    try {
        const userBlog = await blogSchema.find({ user_id: _id })
            .populate({
                path: "userId",
                select: "FullName profilePic"
            })
        res.status(200).json({
            success: "success",
            data: userBlog
        })
    } catch (err) {
        res.status(404).json({
            success: "failure",
            message: "error occured " + err.message
        })
    }
}

//delete blog API
const deleteBlog = async (req, res) => {
    let id = req.params.id
    try {
        const blog = await blogSchema.findByIdAndDelete(id)
        res.status(200).json({
            success: "success",
            message: "blog deleted successfully"
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: err.message
        })
    }
}

//update blog API
const updateBlog = async (req, res) => {
    let blogid = req.params.id
    try {
        const blog = await blogSchema.findByIdAndUpdate(blogid, { $set: req.body })
        await blog.save()
        res.status(201).json({
            success: "success",
            message: "blog updated successfully"
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: err.message
        })
        console.log(err.message);
    }
}

module.exports = {
    addBlog,
    listBlog,
    detailBlog,
    blogLike,
    searchBlog,
    UserBlog,
    deleteBlog,
    updateBlog
}