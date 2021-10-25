const Habit = require('../model/HabitModel')


async function index(req, res) {
    try {
        const habits = await Habit.all
        res.status(200).json(habits)
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function create(req, res) {
    try {
        console.log(req.session.email)
        const habits = await Habit.create(req.body)
        res.status(200).json(habits)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}

module.exports = { index, create }