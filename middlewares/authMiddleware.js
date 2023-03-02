const userSchema = require('../models/userModelSchema')
const jwt = require('jsonwebtoken')


const checkAuth = async (req, res, next) => {
    let authorization;
    authorization = req.headers['authorization'];
        try {
            if (authorization && authorization.startsWith("Bearer")){
            let token = authorization.split(" ")[1];
            const { userID } = jwt.verify(token, process.env.SECRETKEY);
            req.user = await userSchema.findById(userID).select('-password');
            next();
            }else{
                res.status(401).send({
                    status: "failure",
                    message: "token required"
                })
            }
        }
        catch (err) {
            res.status(401).send({
                status: "failure",
                message: "unauthorised user"
            })
        }
}

module.exports = { checkAuth };
