const Habit = require('../model/HabitModel')
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function index(req, res) {
    try {
        console.log("here in index controlller func")
        const habits = await Habit.all
        res.status(200).json(habits)
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function create(req, res) {
    try {
        const header = req.headers['authorization'];
        if (header) {
            const token = header.split(' ')[1];
            jwt.verify(token, process.env.SECRET, async (err, data) => {
                console.log("pulled out middleware")
                console.log(data)
                const habits = await Habit.create(req.body, data.email)
                res.status(200).json(habits)
    
                if(err){
                    res.status(403).json({ err: 'Invalid token' })
                } else {
                    next();
                }
            })
        } else {
            res.status(403).json({ err: 'Missing token' })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}

module.exports = { index, create }