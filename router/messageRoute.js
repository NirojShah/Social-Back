const express = require("express")
const auth = require("../middleware/auth")
const { sendMessage, messages } = require("../controller/messageController")
const messageRouter = express.Router()


messageRouter.get("/:chatId",auth,messages)
messageRouter.post("/:chatId",auth,sendMessage)

module.exports = messageRouter