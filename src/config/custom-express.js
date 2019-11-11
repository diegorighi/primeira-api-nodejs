const express = require('./main-express');
const server = express();

const bodyParser = require('body-parser');

//Instancia do endpoint
const userEndPoint = require('../app/routes/users')

//RequestMapping
server.use('/users', userEndPoint);

//Conectando ao banco
const conn = require('./mongodb');

server.use(bodyParser.urlencoded( {extended : false} ));
server.use(bodyParser.json());

module.exports = server;