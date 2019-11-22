const express = require('../../config/main-express'); 
const api = express.Router();
const externalHttpRequest = require('../../config/httpRequest');
const securityIndex = 2;
const removeNewline = require('newline-remove');
const request = require('request-promise');

//==================================================================

/**
 * <p> Responsável por obter chave pública </p>
 * @author Diego Righi
 * @returns {@link body}
 */
async function getSecurityToken(callback){
    try{
        await externalHttpRequest.get('http://52.168.167.13:1211/v1/getKey/', (error, response) => {
            return callback(JSON.parse(response.body));
        });
    }catch(error){
        return resp.send({ errorMessage : 'Ocorreu um erro com a comunicação do Gateway. Codigo : ROUTES/GATEWAY017-141119' });
    }
}

api.post('/logon', async(req, resp) => {
    let secure;
    getSecurityToken( (resp) => {
        let { user } = req.body;
        let { publicKey } = resp;

        let requestBody = {
            'user' : user,
            'password' : publicKey
        };

        
        const options = {
            method: 'POST',
            uri: 'http://52.168.167.13:1211/v1/logon/',
            body: requestBody,
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        request(options).then(function (response){
            res.status(200).json(response);
        })
        .catch(function (err) {
            console.log(err);
        });



    }) 
    

    

})

module.exports = api;