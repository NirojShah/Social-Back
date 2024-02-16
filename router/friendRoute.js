const express = require("express")
const auth = require("../middleware/auth")
const {
    addFriend,
    removeFriend,
    getFriends,
    sentRequest,
    acceptRequest,
    myRequest
} = require("../controller/friendController")

const friendRouter = express.Router()

friendRouter.post("/add/:id", auth, addFriend)
friendRouter.delete("/:id", auth, removeFriend)
friendRouter.get("/myfriends", auth, getFriends)


friendRouter.get("/sent/:id", auth, sentRequest)
friendRouter.post("/accept/:id", auth, acceptRequest)
friendRouter.get("/myrequests",auth,myRequest)

module.exports = friendRouter