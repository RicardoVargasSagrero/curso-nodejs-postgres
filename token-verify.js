const jwt = require('jsonwebtoken');

const secret = 'myPersonalKey';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0Mjc5OTM0N30.GwFKLZdMNLciWIs6rJ0wLPM8dCQQjEsYxqCmE1ml-lU';
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
