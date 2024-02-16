const {
    Schema,
    default: mongoose
} = require("mongoose")
const chatModel = require("../model/chat.js")

const send = async (req, res) => {
    try {
        let sender = req.user._id
        let reciever = req.params.id
        let msg = req.body.message
        if (!sender && !reciever && !msg) {
            return res.status(400).json({
                status: "failed",
                msg: "data is insufficient"
            })
        }
        const sendSMS = await chatModel.create({
            sender,
            reciever,
            msg: msg
        })
        res.status(200).json({
            status: "success",
            data: {
                sendSMS
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: "failed to send message"
        })
    }
}

const fetchAll = async (req, res) => {
    try {
        const all_msg = await chatModel.find({
            $or: [{
                sender: req.user._id,
                reciever: req.params.id
            }, {
                reciever: req.user._id,
                sender: req.params.id
            }]
        }).sort({
            "createdAt": 1
        })
        if (!all_msg) {
            return res.status(401).json({
                status: "failed",
                msg: "can't find your chats"
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                all_msg
            }
        })

    } catch (error) {
        res.status(401).json({
            status: "failed",
            msg: error.message
        })
    }
}

const deleteMsg = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user._id
        let msg = await chatModel.findById(id)

        const deletedMsg = await chatModel.findByIdAndDelete(id)
        res.status(200).json({
            status: "success",
            msg: "Message deleted successfully."
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            msg: err.message
        })
    }
}

const myMessageHistory = async (req, res) => {
    const message = await chatModel.find({sender:req.user._id} || { reciever:req.user._id})
    // console.log(message)
}

module.exports = {
    send,
    fetchAll,
    deleteMsg,
    myMessageHistory
}