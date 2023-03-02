const userSchema = require('../models/userModelSchema')
const sendMail = require('../services/emailServise')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// user signUp API
const signUp = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    try {
        const email = req.body.email;
        const isEmailExist = await userSchema.findOne({ email })
        if (isEmailExist) {
            res.status(409).json({
                success: "failure",
                message: "User with this email is already exist"
            })
        } else {
            try {
                const user = new userSchema(req.body);
                const filepath = `/uploads/${req.file.filename}`
                user.profilePic = filepath
                user.password = await bcrypt.hash(req.body.password, salt)
                await user.save()
                res.status(201).json({
                    success: "success",
                    message: "User created successfully"
                })
            } catch (err) {
                res.status(400).json({
                    success: "failure",
                    message: "error occured " + err
                })
            }
        }
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: err
        })
    }
}

//User SignIn API
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const findUser = await userSchema.findOne({ email: email })
        if (findUser) {
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (findUser.email === email && isMatch) {
                const token = jwt.sign({ userID: isMatch._id }, process.env.SECRETKEY, { expiresIn: "8d" });
                res.status(200).json({
                    success: "success",
                    message: "login Successful",
                    token: token
                });
            } else {
                res.status(400).json({
                    success: "failure",
                    message: "error occured ",
                })
            }
        } else {
            res.status(400).json({
                success: "failure",
                message: "Password does not Match",
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

//Email for reser password API
const emailForResetPass = async (req, res) => {
    const email = req.body.email
    try {
        const isEmailExist = await userSchema.findOne({ email })
        if (isEmailExist) {
            const token = await jwt.sign({ userID: isEmailExist._id }, process.env.SECRETKEY, { expiresIn: "9d" })
            const link = `http://127.0.0.1.6000/resetUserPassword/${isEmailExist._id}/${token}`
            await sendMail.sendMail(link,isEmailExist.email);
            res.status(200).json({
                success: "success",
                message: "email sent successfulyy",
                data: token
            })
        } else {
            res.status(404).json({
                success: "failure",
                message: "this email user is not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}

//Reset password API
const resetPassword = async (req, res) => {
    const id = req.params.id
    const token = req.params.token
    const newpassword = req.body.newpassword
    const confirmPass = req.body.confirmPass
    try {
        const isUserExist = await userSchema.findById(id)
        if (isUserExist != null) {
            jwt.verify(token, process.env.SECRETKEY);
            if (newpassword == confirmPass) {
                const salt = await bcrypt.genSalt(10)
                var password = await bcrypt.hash(confirmPass, salt)
                await userSchema.findByIdAndUpdate(isUserExist._id,
                    { $set: { password: password } })
                res.status(200).json({
                    success: "success",
                    message: "Password reset successfully"
                })
            } else {
                res.status(401).json({
                    successs: "failure",
                    message: "password doesn't match"
                })
            }
        } else {
            res.status(403).json({
                status: "failure",
                message: "user does not exist"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            staus: "failure",
            message: error.message
        })
    }
}

module.exports = {
    signUp,
    signIn,
    emailForResetPass,
    resetPassword
};
