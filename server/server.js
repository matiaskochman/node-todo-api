const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} =require('mongodb');
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
app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.status(200).send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

//Get one
app.get('/todos/:id',(req,res)=>{

  const id = req.params.id;
  console.log(req.params);
  //valid id using isValid
    //404 - send back empty
    if(!ObjectID.isValid(id)){
      console.log('ID is not valid');
      res.status(404).send();
    }

    Todo.findById(id).then((todo)=>{
      if(!todo){
        return res.status(404).send();
      }
      res.status(200).send({todo: todo});
    }).catch((e)=>{
      res.status(400).send();
    });

});

//deleteOne
app.delete('/todos/:id',(req,res)=>{

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


app.listen(port,()=>{
  console.log(`server listening in port ${port}`);
})

module.exports ={app};
