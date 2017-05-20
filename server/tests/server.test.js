const expect = require('expect');
const request = require('supertest');
const {ObjectID} =require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todoList = [{
  _id: new ObjectID(),
  text:'1st todo'
},{
  _id: new ObjectID(),
  text:'2nd todo'
}];

beforeEach( done => {
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todoList);
  }).then(()=>done());

});

describe('POST /todos', () => {
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

describe('GET /todos',()=>{
  it('should list todos',(done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id',()=>{
  it('should return todo doc',(done)=>{
    request(app)
      .get(`/todos/${todoList[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todoList[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-objects-ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });

});
