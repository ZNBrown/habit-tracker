const db = require('../dbConfig/init')
const User = require('./UserModel')



class Habit {
    constructor(data) {


        this.id = data.id;
        this.habit_name = data.habit_name;
        this.frequency = data.frequency;
        this.frequency_track = data.frequency_track;
        this.frequency_target = data.frequency_target;
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

    static findById(id){
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
                let complete = false;
                const { habit_name,  frequency, frequency_target} = habitData
                console.log(`habit data ${habitData}`)
                console.log(`habit name ${habit_name}`)
                console.log(`user email ${userEmail}`)
                let user = await User.findByEmail(userEmail)
                const habits = await db.query('INSERT INTO Habits (habit_name, frequency, frequency_track, frequency_target, complete, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [habit_name, frequency, frequency_track, frequency_target, complete, user.id])
                const newHabit = new Habit(habits.rows[0]);
                res(newHabit)
            } catch (err) {
                rej(`Failed to create Habit ${err}`)
            }
        })
    }

    updateFrequencyTrack(){
        return new Promise(async (res,rej) => {
            try {
                if(this.frequency_track < this.frequency_target){
                    let updateQuery = await db.query(`UPDATE Habits SET frequency_track = frequency_track + 1 WHERE id = $1 RETURNING *;`,[this.id])
                    let updateFreq = new Habit(updateQuery.rows[0])
                    console.log(`update freq is ${JSON.stringify(updateFreq)}`)
                    res(JSON.stringify(updateFreq))
                } else {
                    let comUpdateQuery = await db.query(`UPDATE Habits SET complete = true WHERE id = $1 RETURNING *;`,[this.id])
                    let updateComp = new Habit(comUpdateQuery.rows[0])
                    res(updateComp)
                }
            } catch (err) {
                rej(`Failed to update frequency track: ${err}`)
            }
        })
    }

    updateReduceFrequency(){
        return new Promise(async (res,rej) => {
            try {
                let updateQuery = await db.query(`UPDATE Habits set frequency_track = frequency_track - 1 WHERE id = $1 RETURNING *;`,[this.id])
                let reduceFreq = new Habit(updateQuery.rows[0])
                res(reduceFreq)
            } catch (err) {
                rej(`failed to update frequency: ${err}`)
            }
        })
    }

    updateComplete(){
        return new Promise(async (res,rej) => {
            try {
                if (this.frequency_track == this.frequency_target){
                    let updateQuery = await db.query(`UPDATE Habits SET complete = true WHERE id = $1 RETURNING *;`,[this.id])
                    let updateComp = new Habit(updateQuery.rows[0])
                    res(updateComp)
                }else{
                    res('frequency track is not the same')
                }
            } catch (err) {
                rej(`failed to update complete: ${err}`)
            }
        })
    }


    
    del(){
        return new Promise(async (res, rej) => {
            try {
                await db.query(`DELETE FROM Habits WHERE id = $1 RETURNING user_id;`,[this.id])
                res('The habit has been deleted')
            } catch (err) {
                rej(`failed to delete habit: ${err}`)

            }
        })
    }




}

module.exports = Habit
