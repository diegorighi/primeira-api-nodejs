
/**
 * <p> Faz configuração necessária para conectar-se ao MongoDB. </p>
 * @author Diego Righi
 */

const mongoose = require('mongoose');
const url = 'mongodb+srv://user_admin:abcde123456@api-teste-abjhb.mongodb.net/test?retryWrites=true&w=majority';

const mongooseOption = {    reconnectTries: Number.MAX_VALUE,
                            reconnectInterval: 500,
                            poolSize: 5,
                            useNewUrlParser: true,
                            useUnifiedTopology: true
                        };
        
mongoose.connect(url, mongooseOption);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
    console.log('Configuração do MongoDB [STATUS]: Conectado com sucesso ao banco de dados.');
});

module.exports = mongoose;
