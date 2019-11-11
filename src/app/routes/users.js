const express = require('../../config/main-express');
const api = express.Router();

api.get('/', (req, resp) => {
    return resp.send({
        message : 'Tudo certo com o metodo GET da rota /users'
    });
})

module.exports = api;