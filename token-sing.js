const jwt = require('jsonwebtoken');

const secret = 'myPersonalKey';
const payload = {
  sub: 1, //Identificador del Token
  role: 'customer',
}

function signToken(payload, secret){
  return jwt.sign(payload, secret);
}


const token = signToken(payload, secret);
console.log(token);
