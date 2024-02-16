const express = require("express")
const {
    signup,
    login,
    update,
    getUser,
    getUsers
} = require("../controller/userController.js")
const auth = require("../middleware/auth")

const multer = require("multer")
const { storage } = require("../utils/multer")

const upload = multer({storage:storage})

let userRoute = express.Router()

userRoute.get("/", auth, getUsers)
userRoute.get("/:id", auth, getUser)
userRoute.post("/signup", upload.single("avatar"), signup)
userRoute.post("/login", login)
userRoute.put("/update", auth, update)

module.exports = userRoute