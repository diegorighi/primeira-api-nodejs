/**
 * <p> Faz validação do JAVA WEB TOKEN para uso INTERNO de rotas. </p>
 * @author Diego Righi
 */

const jwt = require('../config/generate-token');

const auth = (req, resp, next) => {
    let tokenHeader = req.headers.token;
    if(!tokenHeader) return resp.send({ errorMessage : 'Token não informado.' });
}