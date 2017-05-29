const {ObjectID} =require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userId1 = new ObjectID();
const userId2 = new ObjectID();

const userList = [{
  _id:userId1,
  email:'test1@test.com',
  password:'password1',
    tokens: [{
          access:'auth',
          token: jwt.sign({_id: userId1, access:'auth'},'abc123').toString()
          }
    ]
},
  {
    _id:userId2,
    email:'test2@test.com',
    password:'password2',
    tokens: [{
          access:'auth',
          token: jwt.sign({_id: userId2, access:'auth'},'abc123').toString()
          }
    ]

  }
];

const todoList = [{
  _id: new ObjectID(),
  text:'1st todo',
  _creator:userId1
},{
  _id: new ObjectID(),
  text:'2nd todo',
  completed: true,
  completedAt: 555,
  _creator: userId2
}];

const populateTodos = (done) => {
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todoList);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var user1 = new User(userList[0]).save();
    var user2 = new User(userList[1]).save();
    return Promise.all([user1,user2]);
  }).then(() => {
    done()
  }).catch((e) => {
    console.log(e);
  });
};

module.exports = {todoList,populateTodos,userList,populateUsers};
