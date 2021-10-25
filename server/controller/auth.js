const bcrypt = require('bcryptjs')

const User = require('../model/UserModel')

async function create (req, res){
    try {
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        await User.create({...req.body, password: hashedPass})
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json(err)
    }
}
async function login (req, res){
    try {
        const user = await User.findByEmail(req.body.email)
        if(!user){
            throw new Error('No user with this email')
        }
        const authed = bcrypt.compare(req.body.password, user.password)
        if(!!authed){
            res.status(200).json({user: user.username})
        } else {
            throw new Error('User failed to authenticate')
        }
    } catch (err) {
        res.status(401).json({err})
    }
}

module.exports = {create, login}