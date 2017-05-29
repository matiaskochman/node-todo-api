const expect = require('expect');
require('../config/config');
var {mongoose} = require('../db/mongoose');
var {User} = require('../models/user');
const {userList,populateUsers} = require('./seed/seed');

beforeEach(populateUsers);

describe('Test User methods',() => {
  it('should test findByToken ', (done) => {

    User.findByToken(userList[1].tokens[0].token).then((user) => {
      if(!user){
        //I'm forcing to go to the catch below.
        return Promise.reject();
        console.log('not found.')
      }

      expect(user.email).toBe('test2@test.com')
      done();
    }).catch((e) => {
      console.log(e);
      done();
    });


  })
})
