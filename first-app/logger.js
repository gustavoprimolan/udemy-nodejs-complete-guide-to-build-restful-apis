//AS FUNÇÕES NO JAVASCRIPT SÃO SEMPRE COBERTAR (WRAPPED) POR UMA FUNÇÃO ASSIM
//ELA É CHAMADA DE MODULE WRAPPER FUNCTION
//(function (exports, require, module, __filename, __dirname) {

    //console.log(__filename);
    //console.log(__dirname);

    //var url = 'http://mylogger.io/log';

    //function log(message) {
        //SEND AN HTTP REQUEST
        ///SÓ UM EXEMPLO
        //console.log(message);
    //}

    //EXPORT THE OBJECT LOG
    //É POSSÍVEL EXPORTAR UMA FUNÇÃO SIMPLES OU UM OBJETO
    //module.exports.log = log;
    //module.exports = log
    //module.exports.endPoint = url;

    //module.exports.log = log;
    //exports.log = log;

    //REFERÊNCIA PARA O MODULO EXPORTS
    //exports = log;
//})


const EventEmitter = require('events');
const emitter = new EventEmitter();

var url = 'http://mylogger.io/log';


class Logger extends EventEmitter {

    log(message) {
        //SEND AN HTTP REQUEST
        //SÓ UM EXEMPLO
        console.log(message);
    
        //RAISE AN EVENT
        //USA O EVENTO QUE ESTENDE
        this.emit('messageLogged', {id: 1, url: 'http://'});
    }

}

//EXPORT THE OBJECT LOG
//É POSSÍVEL EXPORTAR UMA FUNÇÃO SIMPLES OU UM OBJETO
module.exports = Logger;