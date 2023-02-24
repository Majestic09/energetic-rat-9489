
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password:String,
    name:String,
    pincode: Number,
    city: String,
    mobile: Number,
    region:String
},{versionKey:false})

const userModel = mongoose.model("users", userSchema);
module.exports = { userModel };