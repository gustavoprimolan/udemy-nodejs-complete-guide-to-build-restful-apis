const bcryptjs = require('bcryptjs');

//BEST PRACTICE ASSYNCHRNOUS]
async function run() {
    //GERA UM HASH DE UM NÍVEL QUE É PASSADO ENTRE OS PARÂMETROS
    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash('1234', salt);
    
    console.log(salt);
    //O HASHED POSSUIO O SALT
    console.log(hashed);
}

run();

//SINCRONO, MAS A MELHOR É UMA BOA PRÁTICA UTILIZAR O ASSINCRONO
//bcryptjs.genSaltSync();