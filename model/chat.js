const {
    model,
    Schema
} = require("mongoose")

const chatSchema = new Schema({
    sender: {
        type: Schema.ObjectId,
        requried: [true, "Sender id is required"],
        ref: "usermodels"
    },
    reciever: {
        type: Schema.ObjectId,
        requried: [true, "Reciever id is required"],
        ref: "usermodels",
    },
    msg: {
        type: String,
        min: [1, "Can't send empty message"],
        max: [255, "Can't send more then 255 characters"],
        requried: [true, "Can't send empty message"]
    }
    
}, {
    timestamps: true
})

module.exports = model("chats", chatSchema)