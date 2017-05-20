const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} =require('mongodb');
const port = 3000;


var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text:req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  }).catch((e)=>{
    console.log('not saving todo')
    res.status(400).send(e);
  })
  console.log(req.body);
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.status(200).send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req,res)=>{

  const id = req.params.id;
  console.log(req.params);
  //valid id using isValid
    //404 - send back empty
    if(!ObjectID.isValid(id)){
      console.log('ID is not valid');
      res.status(404).send();
    }


  //findById
    //success
      //if todo send it back
      //if no todo send 404 with empty body
      Todo.findById(id).then((todo)=>{
        if(!todo){
          return res.status(404).send();
        }
        res.status(200).send({todo: todo});
      }).catch((e)=>{
        res.status(400).send();
      });


    //error
      //400 - send an empty body back
});

app.listen(port,()=>{
  console.log(`server listening in port ${port}`)
})

module.exports ={app};
