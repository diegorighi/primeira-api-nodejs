
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
    console.log('Conectado com sucesso ao banco de dados.');
});

module.exports = mongoose;
