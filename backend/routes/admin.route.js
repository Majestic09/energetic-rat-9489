const express = require("express");
const { adminModel } = require("../models/admin.model.js");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");

// admin data
adminRouter.get("/alldata", async (req, res) => {
  try {
    const users = await adminModel.find();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send({ msg: err.message });
  }
});

// admin registration
adminRouter.post("/signup", async (req, res) => {
    let { name, email, password, isAdmin } = req.body;
    const checkadmin = await adminModel.find({ email, isAdmin });
    console.log(checkadmin)
    if (checkadmin) {
        try {
            bcrypt.hash(password, 5, async (err, hash) => {
              if (err) console.log("err", err);
              else {
                const admin = new adminModel({ email, password: hash, name, isAdmin });
                await admin.save();
                res.send({ msg: "Admin login sucessfull" });
              }
            });
          } catch (err) {
            console.log(err);
          }
    } else {
        console.log("Something went wrong")
    }

});

module.exports = { adminRouter };
