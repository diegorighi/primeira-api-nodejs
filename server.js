const customExpress = require('./src/config/custom-express');

customExpress.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000.');
});