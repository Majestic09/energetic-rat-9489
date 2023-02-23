
const express = require("express");
const { userModel } = require("../models/user.model.js");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
 require("dotenv").config();


userRouter.get("/", async (req, res) => {
    res.send(`<html><h1>HOME PAGE</h1></html>`)
})

// user registration route
userRouter.post("/signup", async (req, res) => {
    let { email, password, name, pincode, city, mobile, region } = req.body;
    const checkuser = await userModel.find({ email,mobile });
    console.log(checkuser);
    if (checkuser) {
        res.send({ "msg": "User already registerd Please login" })
    } else {
        try {
            if (email && password && name && pincode && city && mobile && region) {
                bcrypt.hash(password, 6, async (err, hash) => {
                    if (err) {
                        console.log(err);
                        res.send({ 'msg': "Something went wrong" })
                    } else {
                        const user = new userModel({ email, password: hash, name, pincode, city, mobile, region })
                        await user.save();
                        res.send({ 'msg': "Signup Successfull" })
                   
                    }

                });
            } else {
           
                res.send("Fill all Details")
            }
        } catch (err) {
            console.log(err);
            res.send({ "msg": err.message })
        }
    }
})


//user login route

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
   
    // var name;
    try {
        const user = await userModel.find({ email });
        // console.log(user);
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, process.env.key);
                    res.send({"msg":"Login Sucessfull",token:token,name:user[0].name})
                } else {
                    res.send({'msg':'wrong credentials'})
                }
            })
        }
        else {
            res.send({'msg':"Please Create account"})
        }
    } catch (err) {
        console.log(err);
        res.send(err.message)
    }
})

// show all user 
userRouter.get("/alldata", async (req, res) => {
    try {
        const user = await userModel.find(); 
        res.send(user)
    } catch (err) {
        console.log(err);;
        res.send({"msg":"Something went wrong"})
    }
})

// delete user from the database

userRouter.put("/delete/:id", async (req, res) => {
    try {
        await userModel.findByIdAndDelete({ _id: req.params.id });
        res.json("User Remove")
    } catch (err) {
        console.log(err);
        res.send({"msg":"Something went wrong"})
    }
})

module.exports = {userRouter}