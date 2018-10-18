//O _id do mongodb tem 12 bytes que identifica um document em mongodb
// _id: 5bb78213c6d6e020f047e221
// 12 bytes
    // os 4 primeiros bytes: timestamp
    // 3 bytes: machine identifier
    // 2 bytes: process identifier
    // 3 bytes: counter

//UMA CHANCE BEM PEQUENA DE TER 2 ID's IGUAIS
//1 byte = 8 bits
//2 ^ 8 = 256
//2 ^ 24 = 16M

//DRIVER CONVERSA COM O MONGODB
// MongoDB Driver -> MongoDB 

const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId();
console.log(id);
console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid('1234');
console.log(isValid);