//A PROMISE É UM OBJETO QUE SEGURA UM RESULTADO EVENTUAL DE UMA OPERAÇÃO ASSINCRONA
const p = new Promise( (resolve, reject) => {
    //Kick off some async work
    //...
    setTimeout(() => {
        resolve(1); //pending => resolved, fulfilled
        reject(new Error('message')); //pending => rejected
    }, 2000);
    
    
});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));