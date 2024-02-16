const express = require("express")
const {
    writeFeed,
    deleteFeed,
    feeds,
    upvote
} = require("../controller/feedController")
const auth = require("../middleware/auth")
const multer = require("multer")
const {
    feedStorage
} = require("../utils/multer")

const upload = multer({
    storage: feedStorage
})

const feedRouter = express.Router()

feedRouter.get("/", auth, feeds)
feedRouter.post("/write", upload.single("img"), auth, writeFeed)
feedRouter.delete("/delete/:id", auth, deleteFeed)
feedRouter.post("/upvote/:id", auth, upvote)

module.exports = feedRouter