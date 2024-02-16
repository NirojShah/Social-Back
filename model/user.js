const {
    model,
    Schema
} = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "User Name required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email address is required."],
        validate: [validator.isEmail, "Invalid Email address"],
        unique: [true, "Email address is Already in Used."]
    },
    phone: {
        type: String,
        required: [true, "Phone No. is required"],
        validate: [validator.isMobilePhone, "Invalid Phone Number"],
        unique: [true, "Phone No. is Already in use."]
    },
    password: {
        type: String,
        required: [true, "Password is Required."],
        min: [8, "Password should contain atleast 8 characters."],
        max: [15, "Password should not exist above 15 characters."]
    },
    avatar: {
        type: [""]
    }
}, {
    timestamps: true
})


userSchema.methods.comparePassword = async function (dbPassword, enteredPassword) {
    // return await bcrypt.compare(enteredPassword, dbPassword)
    return enteredPassword === dbPassword
}

userSchema.pre("save", async function (next) {
    // this.password = await bcrypt.hash(this.password, 10)
    next()
})

module.exports = model("userModel", userSchema)