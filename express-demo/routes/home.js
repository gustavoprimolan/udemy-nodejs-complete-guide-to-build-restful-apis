const express = require('express');
const router = express.Router();

//PRIMEIRO PARAMETRO É A RAIZ
//SETANDO O RETORNO DO TEMPLATE USANDO pug
router.get('/', (req, res) =>{
    //ARQUIVO E OS OBJETOS DEFINIDOS NO ARQUIVO
    res.render('index', {title: 'My Express App', message: 'Hello'});
    res.send('Hello World');
});

module.exports = router;