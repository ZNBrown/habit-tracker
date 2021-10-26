const Habit = require('../model/HabitModel')
const {checkUser} = require('../middleware/token')
const jwt = require("jsonwebtoken");

async function index(req, res) {
    try {
        const header = req.headers['authorization'];
        if (header) {
            let userId;
            const token = header.split(' ')[1]
            jwt.verify(token, process.env.SECRET, async (err, data) => {
                if(err){
                    console.log(err.message);
                    next();
                } else {
                    userId = data.id
                }
            })
            const habits = await Habit.getHabitByUserId(userId)
            res.status(200).json(habits)
        }
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function create(req, res) {
    try {
        const header = req.headers['authorization'];
        if (header) {
            let userEmail;
            const token = header.split(' ')[1]
            jwt.verify(token, process.env.SECRET, async (err, data) => {
                if(err){
                    console.log(err.message);
                    next();
                } else {
                    userEmail = data.email
                }
            })
            console.log(userEmail)
            const habits = await Habit.create(req.body,userEmail)
            res.status(200).json(habits)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}


module.exports = { index, create }