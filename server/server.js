require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const port = process.env.PORT || 3000;


var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');
var authenticate = require('./middleware/authenticate');

var app = express();
app.use(bodyParser.json());

//insert
app.post('/todos',authenticate,(req,res)=>{
  var todo = new Todo({
    text:req.body.text,
    _creator : req.user._id
  });
  todo.save().then((doc)=>{
    res.send(doc);
  }).catch((e)=>{
    res.status(400).send(e);
  })
});

//List all
app.get('/todos',authenticate,(req,res) => {
  Todo.find({
    _creator:req.user._id
  }).then( (todos) => {
    res.status(200).send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

//Get one
app.get('/todos/:id',authenticate,(req,res) => {

  const id = req.params.id;
  //valid id using isValid
    //404 - send back empty
    if(!ObjectID.isValid(id)){
      return res.status(404).send();
    }

    Todo.findOne({
      _id:id,
      _creator:req.user._id
    }).then( (todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.status(200).send({todo: todo});
    }).catch((e)=>{
      res.status(400).send();
    });

});

//deleteOne
app.delete('/todos/:id',authenticate,(req,res) => {

  const id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id:id,
    _creator:req.user._id
  }).then( (todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((err) => {
    res.status(400).send();
  });

});

app.patch('/todos/:id',authenticate,(req,res) => {
  const id = req.params.id;

  //subset of the things the user passed to us
  //to avoid the user update anything he wants.
  var body = _.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // console.log('_id: ',id)
  // console.log('_creator: ',req.user._id)

  Todo.findOneAndUpdate({
    _id:id,
    _creator:req.user._id
  },{$set:body},{new:true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((error) => {
    console.log(error);
  })
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

app.post('/users/login',(req,res) => {

  var body = _.pick(req.body,['email','password']);
  User.findByCredentials(body.email,body.password).then((user) => {

    return user.generateAuthToken().then((token) => {
      res.header('x-auth',token).send(user);

    });
  }).catch((err) => {
    res.status(400).send();
  })

});

app.get('/users/me',authenticate,(req,res) => {
  res.send(req.user);
});

app.delete('/users/me/token',authenticate,(req,res) => {
  req.user.removeToken(req.token).then( () => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
})

app.listen(port,()=>{
  console.log(`server listening in port ${port}`);
})

module.exports ={app};
