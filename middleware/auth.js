const jwt = require("jsonwebtoken")
const userModel = require("../model/user")

const auth = async (req, res, next) => {
    try {
        let tokenData = req.headers.authorization
        let token
        if (tokenData.includes("Bearer")) {
            token = tokenData.split(" ")[1]
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        if (!verify) {
            res.status(400).json({
                status: "failed",
                msg: "token error"
            })
        }
        const user = await userModel.findById(verify.id)
        req.user = user
        next()
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}

module.exports = auth