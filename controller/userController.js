const userModel = require("../model/user")
const friendModel = require("../model/friends")
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign({
        id: id
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

const signup = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({
            email: req.body.email
        })
        if (existingUser) {
            return res.status(201).json({
                status: "success",
                msg: "Already account created please Login."
            })
        }
        const newUser = await userModel.create({
            ...req.body
        })
        newUser.avatar = req.file
        newUser.save()
        res.status(200).json({
            status: "success",
            data: {
                newUser
            }
        })
    } catch (error) {
        res.status(401).json({
            status: "failed",
            msg: error
        })
    }
}

const login = async (req, res) => {
    try {
        let existingUser = await userModel.findOne({
            email: req.body.email
        })
        if (!existingUser || !await existingUser.comparePassword(existingUser.password, req.body.password)) {
            return res.status(400).json({
                status: "failed",
                msg: "Please recheck the password"
            })
        }
        const token = generateToken(existingUser._id)
        res.status(200).json({
            status: "success",
            token,
            data: {
                existingUser
            }
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: "something went wrong"
        })
    }
}


// const login = async (req, res) => {
//     try {
//         const existingUser = await userModel.findOne({
//             email: req.body.email
//         })
//         if (!existingUser) {
//             return res.status(400).json({
//                 status: "failed",
//                 msg: "User not found"
//             })
//         }

//         const passwordMatch = existingUser.password === req.body.password

//         if (!passwordMatch) {
//             return res.status(400).json({
//                 status: "failed",
//                 msg: "Invalid email or password"
//             })
//         }

//         const token = generateToken(existingUser._id)
//         res.status(200).json({
//             status: "success",
//             token,
//             data: {
//                 existingUser
//             }
//         })
//     } catch (error) {
//         console.error("Login error:", error)
//         res.status(400).json({
//             status: "failed",
//             msg: "Something went wrong"
//         })
//     }
// }


const update = async (req, res) => {
    try {
        const updatedUser = await userModel.findOneAndUpdate({
            _id: req.user._id
        }, {
            $set: {
                ...req.body
            }
        }, {
            new: true
        });
        // console.log("updated "+ updatedUser)
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: "Something went wrong"
        })
    }
}

const getUser = async (req, res) => {
    try{
        const user = await userModel.findOne({_id:req.params.id})
        if (!user) {
            return res.status(400).json({
                status: "failed",
                msg: "user does not exist"
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    }catch(error){
        res.status(400).json({
            status: "failed",
            msg: error.message
        })
    }
    
}

const getUsers = async (req, res) => {
    let friends = await friendModel.findOne({
        user: req.user._id
    })
    if (friends) {
        friends.friends.push(req.user._id)
        const allUsers = await userModel.find({
            _id: {
                $nin: friends.friends
            }
        })
        return res.status(201).json({
            status: "success",
            data: {
                allUsers
            }
        })
    }
    const allUsers = await userModel.find({
        _id: {
            $ne: req.user._id
        }
    })
    if (!allUsers) {
        return res.status(400).json({
            status: "failed",
            msg: "you are not authorize"
        })
    }
    res.status(201).json({
        status: "success",
        data: {
            allUsers
        }
    })
}

module.exports = {
    signup,
    login,
    update,
    getUser,
    getUsers
}