//O NÚCLE DA LIB, ELE PROCURA O ARQUIVO OU A PASTA DENTRO DO NODE_MODULES
//ELE PROCURA O index.js do projeto
var _ = require('underscore'); // underscore/index.js

//Core module
//File or folder
//node_modules

var result = _.contains([1, 2, 3], 2);

console.log(result);