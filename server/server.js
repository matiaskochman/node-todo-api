var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;


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
  })
});

app.listen(port,()=>{
  console.log(`server listening in port ${port}`)
})

module.exports ={app};
