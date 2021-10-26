const express = require('express');
const { verifyToken } = require('../middleware/token');
const router = express.Router();
const authController = require('../controller/auth')
const userController = require('../controller/UserController')
const habitController = require('../controller/HabitController')
// let session = require('express-session')
// router.use(session({
//     secret: 'secret',
//     saveUninitialized: true,
//     resave: true
//   }))

//Users
router.post('/register', authController.create)
router.post('/login', authController.login)
router.get('/allUsers', verifyToken, userController.index)
router.get('/:user', verifyToken, userController.show)
router.get('/loggy/logout', verifyToken, authController.logout)


//habits
<<<<<<< HEAD
router.get('/habits/allHabits', verifyToken, habitController.index)
router.post('/habits', verifyToken, habitController.create)
=======
router.get('/habit/allHabits', verifyToken, habitController.index)
router.post('/habits', verifyToken,  habitController.create)

>>>>>>> e44aa397282db05207160843b6e46d6208fd2259

module.exports = router;