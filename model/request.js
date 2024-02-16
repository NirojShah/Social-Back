const {
    Schema,
    model
} = require("mongoose")

const requestSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        required: [true, "user is required"],
        // unique: [true, "user already exists"],
        ref: "userModel"
    },
    request: [{
        type: Schema.ObjectId,
        ref: "userModel",
        // unique: [true, "already request sent..."]
    }]
})



module.exports = model("request", requestSchema)