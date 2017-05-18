//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


//console.log(new ObjectID());


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err){
    return console.log('Unable to connect to mongodb.');
  }

  console.log('Connected to mongodb.');

  // db.collection('Todos').insertOne({
  //   text:'Something to do ',
  //   completed:false
  // },(err,result)=>{
  //   if(err){
  //     return console.log('Unable to insertOne.')
  //   }
  //
  //   console.log(result.ops[0]._id.getTimestamp());
  // });


  db.close();
});
