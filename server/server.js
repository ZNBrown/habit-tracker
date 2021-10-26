const express = require('express');
const cors = require('cors');
let session = require('express-session')

const server = express();
server.use(cors());
server.use(express.json());

server.use(session({secret:"secret"}))

server.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }))


const allRoutes = require('./routes/route')

server.use('/main',allRoutes)

server.get('/', (req, res) => res.send('Welcome to the library'))

module.exports = server