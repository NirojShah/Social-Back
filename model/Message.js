const {
    model,
    Schema
} = require("mongoose")

const messageModel = new Schema({
    sender: {
        type: Schema.ObjectId,
        ref: "userModel"
    },
    chat: {
        type: Schema.ObjectId,
        ref: "chatMain"
    },
    readBy: [{
        type: Schema.ObjectId,
        ref: "userModel"
    }],
    content: {
        type: String,
        trim: true,
        min: [1, "Write atleast 1 character"],
        max: [255, "Should not exceed 255 characters"]
    }
}, {
    timestamps: true
})

module.exports = model("message", messageModel)