const express = require('express');
const { verifyToken } = require('../middleware/token');
const router = express.Router();
const authController = require('../controller/auth')
const userController = require('../controller/UserController')

router.post('/register', authController.create)
router.post('/login', authController.login)
router.get('/allUsers', verifyToken, userController.index)
router.get('/:user', verifyToken, userController.show)

module.exports = router;