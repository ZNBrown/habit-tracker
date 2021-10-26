const express = require('express');
const cors = require('cors');
let session = require('express-session')

const server = express();
server.use(cors());
server.use(express.json());
<<<<<<< HEAD
=======
server.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }))

>>>>>>> e44aa397282db05207160843b6e46d6208fd2259
const allRoutes = require('./routes/route')
server.use('/main',allRoutes)


server.get('/', (req, res) => res.send('Welcome to the library'))

module.exports = server