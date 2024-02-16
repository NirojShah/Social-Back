const {
    model,
    Schema
} = require("mongoose")
const _ = require("underscore")

let friendSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        requried: [true, "User is required"],
        ref: "userModel"
    },
    friends: [{
        type: Schema.ObjectId,
        ref: "userModel",
        unique: [true, "Allready in the friend list"],
    }]
}, {
    timestamps: true
})

friendSchema.pre("save", function (next) {
    this.friends = Array.from(new Set(this.friends))
    next()
})


module.exports = model("friends", friendSchema)