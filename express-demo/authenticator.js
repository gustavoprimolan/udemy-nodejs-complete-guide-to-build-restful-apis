function authenticate(req, res, next){
    console.log('Authenticanting...');
    //VOCÊ PRECISA DO next() SE NÃO A REQUISIÇÃO IRÁ FICAR PRESA E NÃO IRÁ AVANÇAR AO PIPELINE DO PROCESSO
    next();
}

module.exports = authenticate;