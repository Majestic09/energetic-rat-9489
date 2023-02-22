
const express = require("express");
require("dotenv").config()
const app = express();
const { connection } = require("./configs/db.js");
const {userRouter}=require("./routes/user.route.js")
const PORT = process.env.PORT || 8080;
const cors = require('cors');

app.use(express.json())
app.use(cors())

app.use("/users",userRouter)

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("connected to Database");
        console.log(`Server is running at PORT:${PORT}`);
    } catch (err) {
        console.log(err)
    }
})