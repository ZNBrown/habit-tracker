const db = require('../dbConfig/init')


class User {
    constructor(data){
        this.id = data.id
        this.username = data.username
        this.password = data.password
        this.email = data.email
        this.id = data.id
    }

    static get all(){
        return new Promise(async (res, rej) => {
            try {
                let userData = await db.query(`SELECT * FROM users;`)
                let user = userData.rows.map(u => new User(u))
                res(user)
            } catch (err) { 
                rej(`Failed to retrieve all users: ${err}`)
            }
        })
    }

    static create (userData){
        return new Promise(async (res, rej) =>{
            try {
                const {username, password, email} = userData;
                let insertQuery = await db.query(`INSERT INTO users (username, password, email) VALUES ($1,$2,$3) RETURNING *;`, [username,password,email])
                let user = new User(insertQuery.rows[0])
                res(user)
            } catch (err) {
                rej(`Failed to create a user: ${err}`)
            }
        })
    }

    static findByEmail (email) {
        return new Promise(async (res,rej) => {
            try {
<<<<<<< HEAD
                console.log("here")
=======
                console.log(email)
>>>>>>> e44aa397282db05207160843b6e46d6208fd2259
                let selectQuery = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
                console.log(selectQuery.rows[0])
                let user = new User(selectQuery.rows[0])
                res(user)
            } catch (err) {
                rej(`Failed to find user:${err}`)
            }
        })
    }

    
} 

module.exports = User;