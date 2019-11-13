//Import express main
const express = require('./main-express');
const server = express();

//Import mongodb configuration
const conn = require('./mongodb');

//Import and Initialize body-parser
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded( {extended : false} ));
server.use(bodyParser.json());

//GetInstance from UserEndPoint
const userEndPoint = require('../app/routes/user');
server.use('/users', userEndPoint);

//GetInstance from AuthEndPoint
const authEndPoint = require('../app/routes/auth');
server.use('/auth', authEndPoint);

module.exports = server;