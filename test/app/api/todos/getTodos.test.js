const request = require('supertest');
const assert = require('power-assert');
const app = require('../../../../app');
// const requestHelper = require('../../../helper/requestHelper');

describe('test [GET /api/todos]', () => {
  it('return todos in response.body', async () => {
    // const response = await await requestHelper.request({
    //   method:'get',
    //   endPoint: '/api/todos',
    //   statusCode: 200
    // });

    const response = await request(app)
    .get('/api/todos')
    .set('Accept', 'application/json')
    .expect('Content-type', /application\/json/)
    .expect(200);

    const todos = response.body;
    assert.equal(Array.isArray(todos), true);
    todos.forEach(todo => {
      assert.equal(typeof todo.id === 'number', true);
      assert.equal(typeof todo.title === 'string', true);
      assert.equal(typeof todo.body === 'string', true);
      assert.equal(typeof todo.createdAt === 'string', true);
      assert.equal(typeof todo.updatedAt === 'string', true);
    });
  });
});