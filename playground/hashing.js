const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
// var message = 'my name is Matias';
// var hash = SHA256(message).toString();
//
// console.log(message);
// console.log(hash);

var data = {
  id:10
};
var token = jwt.sign(data,'123abc');
console.log(token);

var decoded = jwt.verify(token,'123abc');
console.log(decoded);
