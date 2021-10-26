const Habit = require('../model/HabitModel')
const jwt = require("jsonwebtoken");



async function index(req, res) {
    try {
        console.log("in create controller")
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
            console.log(`user id ${userId}`)
            const habits = await Habit.getHabitByUserId(userId)
            res.status(200).json(habits)
        }

    } catch (err) {
        res.status(500).json({ err })
    }
}

async function create(req, res) {
    try {
        console.log("in create controller")

        const header = req.headers['authorization'];
        if (header) {
            let userEmail;
            const token = header.split(' ')[1]
            console.log(`token in create ${token}`)
            jwt.verify(token, process.env.SECRET, async (err, data) => {
                if(err){
                    console.log("if err")
                    console.log(err.message);
                    next();
                } else {
                    console.log("else err")
                    userEmail = data.email
                }
            })
            console.log(`create, req.body ${req.body}`)
            console.log(`user email: ${userEmail}`)

            const habits = await Habit.create(req.body,userEmail)
            res.status(200).json(habits)
        }

    } catch (err) {
        console.log(`err in create ${err}`)
        res.status(500).json({ err })
    }
}


async function updateComp (req, res){
    try {
        const habit = await Habit.findById(req.params.id)
        await habit.updateComplete()
        res.status(200).end();
    } catch (err) {
        res.status(404).json({err})
    }
}
async function updatefreq (req, res){
    try {
        const habit = await Habit.findById(req.params.id)
        await habit.updateFrequencyTrack();
        res.status(200).end();
    } catch (err) {
        console.log(err)    
        res.status(404).json({err})
    }
}

async function reduceFreq (req, res){
    try {
        const habit = await Habit.findById(req.params.id)
        await habit.updateReduceFrequency()
        res.status(200).end()
    } catch (err) {
        res.status(404).json({err})
    }
}

async function destroy (req, res) {
    try {
        const habit = await Habit.findById(parseInt(req.params.id))
        console.log(habit)
        await habit.del();
        res.status(201).end();
    } catch (err) {
        console.log(err)
        res.status(404).json({err})
    }
}

module.exports = { index, create, destroy, updatefreq, updateComp, reduceFreq }