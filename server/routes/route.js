const express = require('express');
const router = express.Router();
const authController = require('../controller/auth')
const userController = require('../controller/UserController')

router.post('/register', authController.create)
router.post('/login', authController.login)
router.get('/allUsers', userController.index)

module.exports = router;