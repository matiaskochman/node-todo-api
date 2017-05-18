//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


//console.log(new ObjectID());


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err){
    return console.log('Unable to connect to mongodb.');
  }

  console.log('Connected to mongodb.');

  //delete many
    // db.collection('Todos').deleteMany({text:'Something to do '}).then((result)=>{
    //   console.log(JSON.stringify(result,undefined,2));
    // });
  //deleteOne
    // db.collection('Todos').deleteOne({text:'Something to do '}).then((result)=>{
    //   console.log(result);
    // })

  //findOneAndDelete
    db.collection('Todos').findOneAndDelete({_id:new ObjectID('591da79a6c7021b6f65b2c7b')}).then((result)=>{
      console.log(result);
    })




  db.close();
});
