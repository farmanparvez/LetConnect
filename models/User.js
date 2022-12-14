const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        requied: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    date: {
        type:Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model("user", UserSchema)