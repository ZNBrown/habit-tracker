const User = require('../model/UserModel')

async function index (req, res) {
    try {
        const users = await User.all
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = {index}