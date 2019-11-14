const express = require('../../config/main-express');
const api = express.Router();
const User = require('../../model/user');
const jwt = require('../../config/generate-token');
//==================================================================


/**
 * <p> Seleciona todos os usuário cadastrados nesta API </p>
 * 
 * @author Diego Righi
 */
api.get('/', async(req, resp) => {
    try{
        let users = await User.find({});
        return resp.send(users);
    }catch(error){
        return resp.send({ errorMessage : 'Ocorrou um erro na busca. Codigo: 07121119'} );
    }
});

/**
 * <p> Responsável por cadastrar novo usuário nesta API </p>
 * <p> A resposta é um JSON contendo os dados do usuário. Exceto sua senha. </p>
 * <p> [ATENÇÃO] A senha é persistida usando bcrypt. Veja MODEL {@link user}
 * 
 * @author Diego Righi
 * @returns {@link user, @link token}
 */
api.post('/', async(req, resp) => {
    const { email, password } = req.body;
    if(!email && !password) return resp.send({ errorMessage : 'Dados de cadastros insuficientes'});

    try{
        if(await User.findOne({ email })) return resp.send({ errorMessage : 'Usuario ja cadastrado.'});

        let user = await User.create(req.body);
        user.password = undefined;
        return resp.send({ user, token : jwt(user.email) });
        
    }catch(error){
        return resp.send({ errorMessage : 'Ocorreu um erro na busca. Codigo : 018121119' })
    }

});


module.exports = api;