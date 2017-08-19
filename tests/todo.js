var utils = require('./utils');
var request = require('supertest');
var mongoose = require('mongoose');
var Todo = require('../apps/todos/models.js');
var app = require('../app.js');

describe('GET /todos', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /todo', function () {
  it('returns 201 status', function (done) {
    var todo = { task: 'Sell books', done: false };

    request(app)
      .post('/todos')
      .send(todo)
      .expect(201, /created/, done)
  });
});

describe('PATCH /todo', function () {
  it('returns 200 status', function (done) {
    var todo = new Todo({ task: 'Save new task', done: false });
    todo.save(function (err, todo) {
      request(app)
        .patch('/todos/' + todo.id)
        .send({done: true})
        .expect(200, /1 row/, done);
    })
  })
})
