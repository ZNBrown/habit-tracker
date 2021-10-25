const db = require('../dbConfig/init')


// CREATE TABLE Habits (
//     id SERIAL PRIMARY KEY,
//     habit_name varchar(100) NOT NULL,
//     habit_info varchar(255),
//     frequency varchar(100) NOT NULL,
//     frequency_target int NOT NULL,
//     complete BOOLEAN NOT NULL,
//     user_id INT
// );

class Habit{
    constructor (data){
        this.habit_name = data.habit_name;
        this.habit_info = data.habit_info;
        this.frequency = data.frequency;
        this.frequency_target = data.frequency_target;
        this.complete = data.complete;
        this.user_id = data.user_id;
    }

    static get all()
    {
        return new Promise(async (res, rej) => {
            try {

                let habitData = await db.query(`SELECT * FROM Habits`)
                let habits = habitData.rows.map((h) => new Habit(h))
                res(habits)
                
            } catch (err) {
                rej(`Error fetching habits, err: ${err}`)
            }

        })

    }

    static getHabitByUserId(userId)
    {
        return new Promise(async, (res, rej) =>{
            try {
                let habitData = await db.query(`SELECT * FROM Habits WHERE user_id = $1;`, [userId])
                let habits = new Habit(habitData.rows[0])
                res(habits)
            } catch (err) {
                rej(`Error fetching habits per id, err:${err}`)
            }
        })
    }
    
    

}