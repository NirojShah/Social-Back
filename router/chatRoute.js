const express = require("express")
const auth = require("../middleware/auth")
const {
    send,
    fetchAll,
    deleteMsg,
    myMessageHistory
} = require("../controller/chatController")

const chatRouter = express.Router()

chatRouter.get("/",auth,myMessageHistory)
chatRouter.get("/:id", auth, fetchAll)
chatRouter.post("/send/:id", auth, send)
chatRouter.delete("/:id", auth, deleteMsg)

module.exports = chatRouter