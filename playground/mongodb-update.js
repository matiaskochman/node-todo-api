//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


//console.log(new ObjectID());


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err){
    return console.log('Unable to connect to mongodb.');
  }

  console.log('Connected to mongodb.');

  db.collection('users').findOneAndUpdate({name:'Matias'},
    {
      $set: {
        name:'Matias Kochman'
      },
      $inc:{
        age:1
      }
    },
    {
      returnOriginal:false
    }).then((result)=>{
      console.log(result);
    });

  db.close();
});
