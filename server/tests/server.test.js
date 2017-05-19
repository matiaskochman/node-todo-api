const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todoList = [{
  text:'1st todo'
},{
  text:'2nd todo'
}];

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todoList);
  }).then(()=>done());

});

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text = "test todo";

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }

        // verificamos lo que se guardo en la base
        // despues de hacer el test

        Todo.find({text:'test todo'}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err)=> done(err));
      });
  });

  it('should not create todo with invalid body data',(done)=>{
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res)=>{
        if(err){
          done(err);
        }

        //verificamos la base para chequear
        //que no se haya guardado data.

        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((err)=> done(err));
      });
  });
});
