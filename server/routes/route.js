const express = require('express');
const { verifyToken } = require('../middleware/token');
const router = express.Router();
const authController = require('../controller/auth')
const userController = require('../controller/UserController')
const habitController = require('../controller/HabitController')
// let session = require('express-session')

//Users
router.post('/register', authController.create)
router.post('/login', authController.login)
router.get('/allUsers', verifyToken, userController.index)
router.get('/:user', verifyToken, userController.show)

//habits
router.get('/allHabits', verifyToken, habitController.index)
router.post('/habits', verifyToken, habitController.create)

module.exports = router;