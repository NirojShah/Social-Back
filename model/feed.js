const {
    model,
    Schema
} = require("mongoose")

const feedSchema = new Schema({
    userModel: {
        type: Schema.ObjectId,
        ref: "userModel",
        required: [true, "User is required."]
    },
    feed: {
        type: String,
        requried: [true, "Can't write empty Feed."]
    },
    upVote: {
        type: Number,
        default: 0
    },
    img:{
        type:[""]
    }
}, {
    timestamps: true
})

module.exports = model("feedSchema", feedSchema)