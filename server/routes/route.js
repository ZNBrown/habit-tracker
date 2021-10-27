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
router.get('/habit/allHabits', verifyToken, habitController.index)
router.get('/habit/:id', verifyToken, habitController.show)
router.post('/habits', verifyToken,  habitController.create)
router.delete('/habit/:id', verifyToken, habitController.destroy)
router.patch('/habit/complete/:id', verifyToken,habitController.updateComp)
router.patch('/habit/frequency/:id', verifyToken,habitController.updatefreq)
router.patch('/habit/rfrequency/:id', verifyToken,habitController.reduceFreq)



module.exports = router;