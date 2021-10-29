const Habit = require('../model/HabitModel')
const jwt = require("jsonwebtoken");

async function index(req, res) {
    try {
        let userId;

        const header = req.headers['authorization'];
        if (header) {
            const token = header.split(' ')[1]
            jwt.verify(token, process.env.SECRET, async (err, data) => {
                if (err) {
                    console.log(err.message);
                    next();
                } else {
                    userId = data.id
                }
            })
        }
        const habits = await Habit.getHabitByUserId(userId)
        res.status(200).json(habits)
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function indextest(req, res) {
    try {
        let userId = 1;
        const habits = await Habit.getHabitByUserId(userId)
        res.status(200).json(habits)

    } catch (err) {
        res.status(500).json({ err })
    }
}
async function createStreak(req, res) {
    console.log('ourside the try')
    try {
        const header = req.headers['authorization'];
        console.log('above header')
        if (header) {
            console.log('inside header')
            let userId;
            const token = header.split(' ')[1]
            jwt.verify(token, process.env.SECRET, async (err, data) => {
                if (err) {
                    console.log(err.message);
                    next();
                } else {
                    userId = data.id
                    console.log(userId)
                }
            })
            console.log(userId)
            const habits = await Habit.getHabitByUserId(userId)
            let completeArr = []
            for (let i = 0; i < habits.length; i++) {
                if (habits[i].complete == "true") {
                    let completed = habits[i].complete
                    completeArr.push(completed)
                } else {
                    console.log('habit not completed')
                }
            }
            console.log(completeArr)
            res.status(200).json(completeArr)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}

async function createTest(req, res) {
    try {
        let userEmail;
        const habits = await Habit.create(req.body, userEmail)
        res.status(200).json(habits)
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function show(req, res) {
    try {
        let habitId = req.params.id
        const habits = await Habit.findById(habitId)
        habits.updateTime()
        res.status(200).json(habits)
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
                if (err) {
                    console.log(err.message);
                    next();
                } else {
                    userEmail = data.email
                }
            })

            console.log(`req body ${JSON.stringify(req.body)}`)

            const habits = await Habit.create(req.body, userEmail)
            res.status(200).json(habits)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}

async function createTest(req, res) {
    try {
        let userEmail;
        const habits = await Habit.create(req.body, userEmail)
        res.status(200).json(habits)

    } catch (err) {
        res.status(500).json({ err })

    }
}


async function updateComp(req, res) {
    try {
        const habit = await Habit.findById(req.params.id)
        await habit.updateComplete()
        res.status(200).end();
    } catch (err) {
        res.status(404).json({ err })
    }
}


async function updatefreq(req, res) {

    try {
        const habit = await Habit.findById(req.params.id)
        await habit.updateFrequencyTrack();
        res.status(200).end();
    } catch (err) {
        console.log(err)
        res.status(404).json({ err })
    }
}

async function reduceFreq(req, res) {
    try {
        const habit = await Habit.findById(req.params.id)
        await habit.updateReduceFrequency()
        res.status(200).end()
    } catch (err) {
        res.status(404).json({ err })
    }
}

async function destroy(req, res) {
    try {
        const habit = await Habit.findById(parseInt(req.params.id))
        await habit.del();
        res.status(201).end();
    } catch (err) {
        console.log(err)
        res.status(404).json({ err })
    }
}



module.exports = { index, indextest, createTest, show, create, destroy, updatefreq, updateComp, reduceFreq, createStreak}

