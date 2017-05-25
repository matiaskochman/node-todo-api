require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const port = process.env.PORT || 3000;


var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();
app.use(bodyParser.json());

//insert
app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text:req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  }).catch((e)=>{
    res.status(400).send(e);
  })
  console.log(req.body);
});

//List all
app.get('/todos',(req,res) => {
  Todo.find().then( (todos) => {
    res.status(200).send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

//Get one
app.get('/todos/:id',(req,res) => {

  const id = req.params.id;
  console.log(req.params);
  //valid id using isValid
    //404 - send back empty
    if(!ObjectID.isValid(id)){
      console.log('ID is not valid');
      res.status(404).send();
    }

    Todo.findById(id).then( (todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.status(200).send({todo: todo});
    }).catch((e)=>{
      res.status(400).send();
    });

});

//deleteOne
app.delete('/todos/:id',(req,res) => {

  const id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then( (todo) => {
    if(!todo){
      res.status(404).send();
    }
    console.log('encontró');
    res.status(200).send({todo});
  }).catch((err) => {
    res.status(400).send();
  });

});

app.patch('/todos/:id',(req,res) => {
  const id = req.params.id;

  //subset of the things the user passed to us
  //to avoid the user update anything he wants.
  var body = _.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo) => {
    if(!todo){
      res.status(404).send();
    }
    res.status(200).send({todo});
  });
});

app.post('/users',(req,res)=>{

  var body = _.pick(req.body,['email','password']);

  var user = new User(body);
  user.save().then(()=>{
    //res.send(user);
    return user.generateAuthToken();
  }).then((token) => {
    // I send the user and the token in the header
    res.header('x-auth',token).send(user);
  })
  .catch((e)=>{
    res.status(400).send(e);
  })
});



app.listen(port,()=>{
  console.log(`server listening in port ${port}`);
})

module.exports ={app};
