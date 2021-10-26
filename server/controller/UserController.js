const User = require('../model/UserModel')
const { verifyToken } = require('../middleware/token');



async function index (req, res) {
    try {
        const users = await User.all
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function show (req, res) {
    try {
        console.log("async function show")
        const user = await User.findByEmail("email5")
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = {index, show}