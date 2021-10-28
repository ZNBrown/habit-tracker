const db = require('../dbConfig/init')
const User = require('./UserModel')

class Habit {
    constructor(data) {
        this.id = data.id;
        this.habit_name = data.habit_name;
        this.frequency = data.frequency;
        this.frequency_track = data.frequency_track;
        this.frequency_target = data.frequency_target;
        this.deadline = data.deadline;
        this.time_created = data.time_created;
        this.complete = data.complete;
        this.user_id = data.user_id;
    }

    static get all() {
        return new Promise(async (res, rej) => {
            try {

                let habitData = await db.query(`SELECT * FROM Habits`)
                let habits = habitData.rows.map(h => new Habit(h))
                res(habits)

            } catch (err) {
                rej(`Error fetching habits, err: ${err}`)
            }

        })

    }

    static getHabitByUserId(userId) {
        return new Promise(async (res, rej) => {
            try {
                let habitData = await db.query(`SELECT * FROM Habits WHERE user_id = $1;`, [userId])
                let habits = habitData.rows.map(h => new Habit(h))
                res(habits)
            } catch (err) {
                rej(`Error fetching habits per user id, err:${err}`)
            }
        })
    }

    static findById(id) {
        return new Promise(async (res, rej) => {
            try {
                let selectQuery = await db.query(`SELECT * FROM Habits WHERE id = $1;`, [id])
                let habits = new Habit(selectQuery.rows[0])
                console.log(`findibg by id ${habits}`)
                res(habits)
            } catch (err) {
                rej(`failed to retrieve habit: ${err}`)
            }
        })
    }

    static create(habitData, userEmail) {
        return new Promise(async (res, rej) => {
            try {
                let frequency_track = 0;
                let complete = "false";
                const { habit_name, frequency, frequency_target } = habitData
                let now = Date.now()
                let deadline = await convert(frequency) + now
                let user = await User.findByEmail(userEmail)
                const habits = await db.query('INSERT INTO Habits (habit_name, frequency, frequency_track, frequency_target, deadline, time_created,complete, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;', [habit_name, frequency, frequency_track, frequency_target, deadline, now, complete, user.id])
                const newHabit = new Habit(habits.rows[0]);
                console.log(newHabit)
                res(newHabit)

            } catch (err) {
                rej(`Failed to create Habit ${err}`)
            }
        })
    }

    updateTime() {
        return new Promise(async (res, rej) => {
            try {
                let now = Date.now()
                if (now >= this.deadline && this.complete == "false") {
                    let complete = "fail"
                    let updateQuery = await db.query(`UPDATE Habits SET complete = $1 WHERE id = $2 RETURNING *;`, [complete, this.id])
                    let updateComplete = new Habit(updateQuery.rows[0])
                    res(updateComplete)
                } else {
                    res("You still have time to complete the habit")
                }
            } catch (err) {
                rej(`failed to update complete, in update time: ${err}`)
            }

        })
    }

    updateFrequencyTrack() {
        return new Promise(async (res, rej) => {
            try {
                if (this.frequency_track < this.frequency_target) {
                    let updateQuery = await db.query(`UPDATE Habits SET frequency_track = frequency_track + 1 WHERE id = $1 RETURNING *;`, [this.id])
                    let updateFreq = new Habit(updateQuery.rows[0])
                    res(updateFreq)
                } else {
                    let comUpdateQuery = await db.query(`UPDATE Habits SET complete = true WHERE id = $1 RETURNING *;`, [this.id])
                    let updateComp = new Habit(comUpdateQuery.rows[0])
                    res(updateComp)
                }
            } catch (err) {
                rej(`Failed to update frequency track: ${err}`)
            }
        })
    }

    updateReduceFrequency() {
        return new Promise(async (res, rej) => {
            try {
                if (this.frequency_track > 0) {
                    let updateQuery = await db.query(`UPDATE Habits set frequency_track = frequency_track - 1 WHERE id = $1 RETURNING *;`, [this.id])
                    let reduceFreq = new Habit(updateQuery.rows[0])
                    res(reduceFreq)
                } else {
                    res("can not go under 0")
                }
            } catch (err) {
                rej(`failed to update frequency: ${err}`)
            }
        })
    }

    updateComplete() {
        return new Promise(async (res, rej) => {
            try {
                if (this.frequency_track == this.frequency_target) {
                    let updateQuery = await db.query(`UPDATE Habits SET complete = true WHERE id = $1 RETURNING *;`, [this.id])
                    let updateComp = new Habit(updateQuery.rows[0])
                    res(updateComp)
                } else {
                    res('frequency track is not the same')
                }
            } catch (err) {
                rej(`failed to update complete: ${err}`)
            }
        })
    }



    del() {
        return new Promise(async (res, rej) => {
            try {
                await db.query(`DELETE FROM Habits WHERE id = $1 RETURNING user_id;`, [this.id])
                res('The habit has been deleted')
            } catch (err) {
                rej(`failed to delete habit: ${err}`)

            }
        })
    }
}


async function convert(frequency) {
    let date = new Date();
    if (frequency == "Daily") {
        let currentTime = date.getHours()
        let remainingTimeHours = 24 - currentTime
        let remainingTime = remainingTimeHours * 3600000
        return remainingTime
    } else if (frequency == "Weekly") {
        let currentWeekDay = date.getDay()
        let currentDayInHours = currentWeekDay * 24
        let remainingTimeHours = 168 - currentDayInHours
        let remainingTime = remainingTimeHours * 3600000
        return remainingTime
    } else if (frequency == "Monthly") {
        let currentMonthDay = date.getDate()
        let currentDayInHour = currentMonthDay * 24
        let remainingTimeHours = 730 - currentDayInHour
        let remainingTime = remainingTimeHours * 3600000
        return remainingTime
    } else {
        console.log('no where')
    }
}

async function startTime() {
    let date = new Date();
    let current_time = date.getHours()
    return current_time
}



module.exports = Habit