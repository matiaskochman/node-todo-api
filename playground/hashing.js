const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

var password = '123abc';

// bcryptjs.genSalt(10,(err,salt) => {
//   bcryptjs.hash(password,salt,(err,hash) => {
//
//     console.log(hash);
//   })
// });

var hashedPassword = '$2a$10$a3qWTA4ybwzFs1/CxXlnf.TV8G/0VEhkt1Wye7rxQsj7DYwf4QpXe';

bcryptjs.compare('123abc',hashedPassword,(err,res) =>{
  console.log(res);
});
// var message = 'my name is Matias';
// var hash = SHA256(message).toString();
//
// console.log(message);
// console.log(hash);

// var data = {
//   id:10
// };
// var token = jwt.sign(data,'123abc');
// console.log(token);
//
// var decoded = jwt.verify(token,'123abc');
// console.log(decoded);
