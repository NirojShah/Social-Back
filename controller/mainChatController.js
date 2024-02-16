const chatModel = require("../model/ChatMain")
const userModel = require("../model/user")

const accessChat = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            res.status(200).json({
                status: "failed",
                msg: "please provide user id"
            })
        }
        var chatAvailable = await chatModel.find({
            $and: [{
                    users: {
                        $eq: req.user._id
                    }
                },
                {
                    users: {
                        $eq: userId
                    }
                }
            ]
        }).populate("users", "-password").populate("latestMessage")
        chatAvailable = await userModel.populate(chatAvailable, {
            path: "latestMessage.sender",
            select: "name email"
        })

        if (chatAvailable.length > 0) {
            res.status(200).json({
                status: "success",
                data: {
                    chatAvailable
                }
            })
        } else {
            const createdChat = await chatModel.create({
                chatName: "sender",
                users: [req.user._id, userId]
            })

            const fullChat = await chatModel.findById(createdChat._id).populate("users", "-password")

            res.status(200).json({
                status: "success",
                data: {
                    fullChat
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message,
            statck: error.stack
        })
    }
}


const fetchChat = async (req, res) => {
    try {
        let allChats = await chatModel.find({
            users: {
                $eq: req.user._id
            }
        }).populate("users", "-password").populate("latestMessage").sort({
            "createdAt": -1
        })

        allChats = await userModel.populate(allChats, {
            path: "latestMessage.sender",
            select: "name email"
        })

        res.status(200).json({
            status:"success",
            data:{
                allChats
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message,
            st:error.stack
        })
    }
}


module.exports = {
    accessChat,
    fetchChat
}