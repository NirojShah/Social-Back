const express = require("express")
const cors = require("cors")
const path = require("path")
const userRoute = require("./router/userRoute")
const chatRouter = require("./router/chatRoute")
const friendRouter = require("./router/friendRoute")
const feedRouter = require("./router/feedRoute")
const mainChatRouter = require("./router/MainChatRoute")
const messageRouter = require("./router/messageRoute")


const app = express()

app.use(express.json())
app.use(cors())


app.use("/app/v1/mainChat",mainChatRouter)
app.use("/app/v1/message",messageRouter)

app.use("/app/v1/user", userRoute)
app.use("/app/v1/chat", chatRouter)
app.use("/app/v1/friends", friendRouter)
app.use("/app/v1/feed", feedRouter)



app.use("/uploads", express.static(path.join(__dirname, "uploads")));



module.exports = app