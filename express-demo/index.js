const startupDebugger = require('debug')('app:startup'); //SET OU EXPORT A VARIÁVEL DEBUG=app:startup
const dbDebugger = require('debug')('app:db');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const authenticator = require('./authenticator');
const Joi = require('joi');
const app = express();

//app.get();
//app.post();
//app.put();
//app.delete();

//RETORNA O AMBIENTE DO NODE
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //SE NADA FOR SETADO RETORNA undefined
//console.log(`app: ${app.get('env')}`);

//---------------------------------------TEMPLATING
app.set('view engine', 'pug');
app.set('views', './views'); //default

//----------------------------------------


//ADDING A PIECE OF MIDDLEWARE
app.use(express.json());

//COM EXTENDED TRUE É POSSÍVEL PASSAR OBJETOS COMPLEXOS E ARRAYS USANDO O URLENCODED FORMAT
app.use(express.urlencoded({extended: true})); //key=value&key=value

//DEIXA ARQUIVOS PÚBLICOS PARA O CLIENT
app.use(express.static('public'));

app.use(helmet());

//HÁ VÁRIAS ROTAS DE api/courses NO MÓDULO DE courses
//NÃO PRECISA REPETIR NO COURSES.JS
app.use('/api/courses', courses);
app.use('/', home);


//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

//MORGAN FAZ UM LOG DO HTTP REQUEST
//GET /api/courses 200 79 - 5.882 ms
//É MUITO ÚTIL EM AMBIENTES DE DESENVOLVIMENTO E EM TESTES
//IF VERIFICA SE O AMBIENTE É O DE DESENVOLVIMENTO
//SE FOR ELE USA O morgan
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

//----------------------------------------- DEBUG
//Db work...
dbDebugger('Connected to the database');

//--------------------------------------

//INSTALL A MIDDLEWARE FUNCTION IN PROCESS PIPELINE
app.use(logger);

app.use(authenticator);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));