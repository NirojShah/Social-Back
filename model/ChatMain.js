const {
    model,
    Schema
} = require("mongoose")


const chatMain = new Schema({
    chatName: {
        type: String,
        trim: "true"
    },
    users: [{
        type: Schema.ObjectId,
        ref: "userModel"
    }],
    latestMessage: {
        type: Schema.ObjectId,
        ref: "message"
    }
}, {
    timestamps: true
})

module.exports = model("chatMain",chatMain)