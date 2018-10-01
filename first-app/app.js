//EXECUTAR: NODE app.js
//function sayHello(name) {
//    console.log("Hello " + name);
//}

//sayHello("Gustavo");

//WINDOW É UM OBJETO GLOBAL PARA OS BROWSERS
//console.log(window); //ERRO!

//NO NODE NÓS USAMOS O global
//console.log(global);

//NÃO NECESSITA DO .js PARA IMPORTAR UM MODULO
//var logger = require('./logger');
//O MAIS RECOMENDADO É UTILIZAR CONSTANTES PARA QUE A VARIÁVEL NÃO SEJA SOBRESCRITA
//const logger = require('./logger');


//CHAMAMOS MODULOS DO NODE COM FUNÇÃO E VARIÁVEIS PARA NÃO INSTANCIAR OBJETOS GLOBAIS
//console.log(module);

//logger.log('message');
//logger('message');


//----------------------------------------------------------------------
//SEM O ./ OU / OU ../ O NODE ASSUME QUE É UM MODULO E NÃO UM ARQUIVO
//const path = require('path');
//var pathObj = path.parse(__filename);
//console.log(pathObj);

//-----------------------------------------------------------------------------
//INFORMAÇÕES SOBRE O SISTEMA OPERACIONAL
//const os = require('os');

//PEGA A MEMÓRIA TOTAL DO SISTEMA OPERACIONAL
//var totalMemory = os.totalmem();

//PEGA A MEMÓRIA LIVRE DO SISTEMA OPERACIONAL
//var freeMemory = os.freemem()

//console.log('Total Memory: ' + totalMemory);

//TEMPLATE STRING - ES6 / ES205 : ECMAScript 6 - Especificações do JavaScript
//console.log(`Total Memory: ${totalMemory}`);
//console.log(`Free Memory: ${freeMemory}`);

//-----------------------------------------------------------------------------
//FILE SYSTEM
const fs = require('fs');


//PEGA TODOS OS ARQUIVOS DO LOCAL ATUAL
//MÉTODO SINCRONO
//const files = fs.readdirSync('./');
//console.log(files);

//SEMPRE PREFIRA USAR MÉTODOS ASSINCRONOS
//TODOS MÉTODOS ASSINCRONOS POSSUI UM ÚLTIMO PARÂMETRO QUE É O CALLBACK
//SENDO O CALLBACK UMA FUNÇÃO COM DOIS PARÂMETRO QUE É O ERROR E O RESUL
//const files = fs.readdir('./', function(err, files){
//    if(err) console.log('Error', err);
//    else console.log('Result', files);
//});
//console.log(files);


//---------------------------------------------------------------------
//NOMENCLATURA PARA CLASSE
//const EventEmitter = require('events');
//const emitter = new EventEmitter();

//REGISTER A LISTENER
//SEGUNDO PARÂMETRO É O CALLBACK
//PRECISA REGISTRAR O LISTENER ANTES DE EMITIR O EVENTO
//emitter.on('messageLogged', function(arg){ // USADO TBM e ou eventArg
//    console.log('Listener called', arg);
//});

//ARROW FUNCTION
//emitter.on('messageLogged', (arg) => {
//    console.log('Listener called', arg);
//});

//MAKING A NOISE, PRODUCE - SIGNALLING - SINALIZANDO ALGO
//RAISE AN EVENT
// PRECISA DE UM LISTENNER PARA ESCUTAR ESSE EVENTO
//O LISTENNER VAI RECEBER O SEGUNDO PARÂMETRO COMO ARGUMENTO
//emitter.emit('messageLogged', {id: 1, url: 'http://'});
//RAISE: LOGGING (data: message)

//const EventEmitter = require('events');
//const emitter = new EventEmitter();

//const Logger = require('./logger');
//const logger = new Logger();

//CRIO UM LISTENER DA CLASSE CRIADA - LOGGER
//logger.on('messageLogged', (arg) => {
//    console.log('Listener called', arg);
//});

//logger.log('message');

//--------------------------------------------HTTP MODULE

const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello World');
        res.end();
    }

    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
        
});

/* Esculta o evento connection para quando alguem conecta na porta 3000 via http
server.on('connection', (socket) =>{
    console.log('New connection...');
});
*/


server.listen(3000);

console.log('Listening on port 3000...');

