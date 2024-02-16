const messageModel = require("../model/Message")
const userModel = require("../model/user")
const chatModel = require("../model/ChatMain")

const messages = async (req, res) => {
    try {
        const messages = await messageModel.find({
            chat: req.params.chatId
        }).populate("sender", "name email").populate("chat")
        res.status(200).json({
            status: "success",
            data: {
                messages
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message
        })
    }
}

const sendMessage = async (req, res) => {
    try {
        const chatId = req.params.chatId
        const message = req.body.message
        if (!chatId || !message) {
            return res.status(400).json({
                status: "failed",
                message: "invalid data"
            })
        }
        let newMessage = await messageModel.create({
            sender: req.user._id,
            content: message,
            chat: chatId
        })
        newMessage = await newMessage.populate("sender", "name email")
        newMessage = await newMessage.populate("chat")
        newMessage = await userModel.populate(newMessage, {
            path: "chat.user",
            select: "name pic email"
        })
        await chatModel.findByIdAndUpdate(chatId, {
            latestMessage: newMessage
        })
        res.status(200).json({
            status: "success",
            data: {
                newMessage
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg:error.message,
            err:error.stack
        })
    }

}

module.exports = {
    messages,
    sendMessage
}