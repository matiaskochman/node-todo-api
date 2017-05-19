const {ObjectID} =require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id= '591ef016ade62f07c4f6650b';

if(!ObjectID.isValid(id)){
  console.log('ID is not valid');
}

//devuelve un array
Todo.find({
  _id:id
}).then((todos)=>{
  console.log('todos ',todos);
})

//devuelve un objeto
Todo.findOne({
  _id:id
}).then((todo)=>{
  console.log('todos ',todo);
})

//devuelve un objeto
Todo.findById(id).then((todo)=>{
  if(!todo){
    return console.log('todo not found');
  }


  console.log('Todo by id ',todo);
})
