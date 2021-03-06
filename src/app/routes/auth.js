const express = require('../../config/main-express');
const api = express.Router();
const User = require('../../model/user');
const bcrypt = require('../../config/auth');
const jwt = require('../../config/generate-token');
//==================================================================

/**
 * <p> Realiza autenticação com JWT nesta API </p>
 * <p> [ATENÇÃO] Informar {@link email} e {@link password} no corpo da requisição HTTP </p>
 * <p> O match do password será feito no {@this #compare} do bcrypt. Veja linha 23. </p>
 * 
 * @author Diego Righi
 */
api.post('/', async(req, resp) => {
    const { email, password } = req.body;
    if(!email && !password) return resp.send({ errorMessage : 'Dados de cadastros insuficientes'});

    try{
        let user = await User.findOne({ email }).select('+password');
        if(!user) return resp.send({ errorMessage : 'Dados informados incorretos.' });

        let userOk = await bcrypt.compare(password, user.password);

        if(!userOk) return resp.send({ errorMessage : 'Ocorreu um erro ao autenticar este usuário. Verifique as informações e tente novamente.' });

        user.password = undefined;
        return resp.send({ 
            message : 'Conectado com sucesso',
            usuario : user.email
         });

    }catch(error){
        return resp.send({ errorMessage : 'Ocorreu um erro na busca. Codigo : 012121119' })
    }
   
});



module.exports = api;