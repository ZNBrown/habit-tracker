const Habit = require('../model/HabitModel')
<<<<<<< HEAD
const jwt = require("jsonwebtoken");
require('dotenv').config();
=======
const {checkUser} = require('../middleware/token')
const jwt = require("jsonwebtoken");
>>>>>>> e44aa397282db05207160843b6e46d6208fd2259

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
<<<<<<< HEAD
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

=======
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
>>>>>>> e44aa397282db05207160843b6e46d6208fd2259
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}


module.exports = { index, create }