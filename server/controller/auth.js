const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require('../model/UserModel')
const redisClient = require('../dbConfig/redisConfig')

 



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
            console.log(`payload:  ${payload}`)
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

async function logout(req, res){
    const header = req.headers['authorization'];
    if (header) {
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.SECRET, async (err, data) => {
            if(err){
                res.status(403).json({ err: 'Not logged in anyway' })
            } else {

                try {
                    await redisClient.LPUSH('token', token);
                    return res.status(200).json({
                      'status': 200,
                      'data': 'You are logged out',
                    });
                } catch (error) {
                  return res.status(400).json({
                    'status': 500,
                    'error': error.toString(),
                  });
                }


            }
        })
    } else {
        res.status(403).json({ err: 'Not logged in' })
    }
}



module.exports = { create, login, logout }