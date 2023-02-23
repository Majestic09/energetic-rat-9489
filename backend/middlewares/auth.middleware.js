
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const token = req.headers.autorization;
    if (token) {
        const decoded = jwt.verify(token, process.env.key)
        if (decoded) {
            const userID = decoded.userID;
            req.body.userID = userID;
            next()
        } else {
            res.send({'msg':'Please Login First'})
        }
    } else {
        res.send({'msg':'Please Login  First'})
    }
}


module.exports = {auth}