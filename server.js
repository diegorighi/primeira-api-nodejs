const customExpress = require('./src/config/custom-express');

customExpress.listen(3000, () => {
    console.log('Configuração do sistema [STATUS]: Servidor iniciado na porta 3000.');
});