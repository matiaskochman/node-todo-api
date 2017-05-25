const {ObjectID} =require('mongodb');

const {Todo} = require('./../../models/todo');

const todoList = [{
  _id: new ObjectID(),
  text:'1st todo'
},{
  _id: new ObjectID(),
  text:'2nd todo',
  completed: true,
  completedAt: 555
}];

const populateTodos = (done) => {
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todoList);
  }).then(()=>done());

};

module.exports = {todoList,populateTodos};
