const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

function verifyToken(req, res, next){
    console.log("verifying")
    const header = req.headers['authorization'];
    if (header) {
        const token = header.split(' ')[1];
        console.log(`token in header! woo ${token}`)
        jwt.verify(token, process.env.SECRET, async (err, data) => {
            if(err){
                console.log("malformed")
                console.log(err)
                res.status(403).json({ err: 'Invalid token' })
            } else {
                next();
            }
        })
    } else {
        console.log("missing")
        res.status(403).json({ err: 'Missing token' })
    }
}

module.exports = {
    verifyToken
}