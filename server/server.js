var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;


var {mongoose} = require('./db/mongoose');
var {User} = require('./models/User');
var {Todo} = require('./models/Todo');

var app = express();
app.use(bodyParser.json());

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

app.listen(port,()=>{
  console.log(`server listening in port ${port}`)
})
