
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: String,
    password:String,
    name:String,
    pincode: Number,
    city: String,
    mobile: Number,
    region:String
})

const userModel = mongoose.model("users", userSchema);
module.exports = { userModel };