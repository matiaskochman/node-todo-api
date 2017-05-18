//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


//console.log(new ObjectID());


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err){
    return console.log('Unable to connect to mongodb.');
  }

  console.log('Connected to mongodb.');

  // db.collection('Todos').find({_id:new ObjectID("591d6c097e35e95656a53657")}).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log('Unable to fetch docs.',err);
  // });
  db.collection('Todos').find().count().then((count)=>{
    console.log('count todos');
    console.log(count);
  },(err)=>{
    console.log('Unable to fetch docs.',err);
  });


  db.close();
});
