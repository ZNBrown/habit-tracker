const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
require('dotenv').config();


const User = require('../model/UserModel')

async function create(req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        await User.create({ ...req.body, password: hashedPass })
        res.status(201).json({ msg: 'User created' })
    } catch (err) {
        res.status(500).json(err)
    }
}
async function login(req, res) {
    try {
        console.log("here in login auth")
        const user = await User.findByEmail(req.body.email)
        if (!user) {
            throw new Error('No user with this email')
        }
        const authed = bcrypt.compare(req.body.password, user.password)
        if (!!authed) {
            const payload = { id: user.id, username: user.username, email: user.email }
            const sendToken = (err, token) => {
                if (err) { throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.SECRET, { expiresIn: 6000000 }, sendToken);
        } else {
            throw new Error('User failed to authenticate')
        }
    } catch (err) {
        console.log(err)
        res.status(401).json({ err })
    }
}



module.exports = { create, login }