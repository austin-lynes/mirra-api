const express = require('express');
const server = express();

const helmet = require('helmet');
const cors = require('cors');
server.use(helmet());
server.use(cors());
server.use(express.json())

const authRouter = require('./api/auth')

server.use('/auth', authRouter);

module.exports = server;