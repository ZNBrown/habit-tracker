const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const { head } = require("../server");

function verifyToken(req, res, next){
    const header = req.headers['authorization'];
    if (header) {
        const token = header.split(' ')[1];
        console.log(`in verifytoken ${token}`)
        jwt.verify(token, process.env.SECRET, async (err, data) => {
            if(err){
                console.log(err)
                console.log(`in verifytoken jwt verify ${token}`)
                res.status(403).json({ err: 'Invalid token' })
            } else {
                next();
            }
        })
    } else {
        console.log("no token")

        res.status(403).json({ err: 'Missing token' })
    }
}

module.exports = {
    verifyToken
}