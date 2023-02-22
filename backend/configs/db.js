const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
require("dotenv").config();
const mongoURL = process.env.mongoURL
const connection = mongoose.connect(mongoURL)

module.exports = { connection };