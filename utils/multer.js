const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/file")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const feedStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/feeds")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

module.exports = {
    storage,
    feedStorage
}