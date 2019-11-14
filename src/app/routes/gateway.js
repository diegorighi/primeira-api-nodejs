const express = require('../../config/main-express'); 
const api = express.Router();
const externalHttpRequest = require('../../config/httpRequest');
const securityIndex = 2;
const secure = null;

//==================================================================

/**
 * <p> Responsável por obter chave pública </p>
 * @author Diego Righi
 * @returns {@link body}
 */
async function getSecurityToken(callback){
    try{
        await externalHttpRequest.get('http://52.168.167.13:1211/v1/getKey/', (error, response, body) => {
        
            let { publicKey }  = JSON.parse(response.body);
            let security = publicKey.split('-----');

            return callback(security[securityIndex]);
        });
    }catch(error){
        return resp.send({ errorMessage : 'Ocorreu um erro com a comunicação do Gateway. Codigo : ROUTES/GATEWAY017-141119' });
    }
}

api.post('/logon', async(req, resp) => {
    let secure;
    getSecurityToken( (resp) => {
        console.log("MEU TOKEN : "+resp)  
    }) 
    

    try{
        let requestBody = { user, password } = req.body;
        if(!user && !password) return resp.send({ errorMessage : 'Dados de cadastros insuficientes'});

        await externalHttpRequest.post('http://52.168.167.13:1211/v1/logon/', {
            requestBody            
        }, (error, response, body) => {
            if(error) return resp.send({ errorMessage : 'Ocorreu um erro na autenticação.'}); 
            
            console.log(requestBody)
            return resp.send(response);
        });
    }catch(error){
        return resp.send({ errorMessage : 'Ocorreu um erro com a comunicação do Gateway. Codigo : ROUTES/GATEWAY028-141119' })
    }

})

module.exports = api;