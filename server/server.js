const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const allRoutes = require('./routes/route')

server.use('/main',allRoutes)


server.get('/', (req, res) => res.send('Welcome to the library'))

module.exports = server