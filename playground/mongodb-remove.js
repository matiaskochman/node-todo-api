const {ObjectID} =require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


Todo.remove({}).then((res)=>{
  console.log(res);
});

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('592036aced7d9acad7f3efbc').then((todo)=>{
  console.log(todo);
});
