//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


//console.log(new ObjectID());


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err){
    return console.log('Unable to connect to mongodb.');
  }

  console.log('Connected to mongodb.');

  db.collection('Todos').findOneAndUpdate({_id:new ObjectID('591da799fb846bb6f5727aa7')},
    {
      $set: {
        completed:true,
        text:'hola pianola'
      }
    },
    {
      returnOriginal:false
    }).then((result)=>{
      console.log(result);
    });

  db.close();
});
