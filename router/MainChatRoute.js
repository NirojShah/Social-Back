const express = require("express")
const auth = require("../middleware/auth")
const {
    accessChat,
    fetchChat
} = require("../controller/mainChatController")

const mainChatRouter = express.Router()

mainChatRouter.post("/:id", auth, accessChat)
mainChatRouter.get("/", auth, fetchChat)



module.exports = mainChatRouter