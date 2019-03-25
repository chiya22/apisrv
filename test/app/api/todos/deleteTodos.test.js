const Todo = require('../../../../models/Todo');
const assert = require('power-assert');
const app = require('../../../../app');
const request = require('supertest');
// const requestHelper = require('../../../helper/requestHelper');

const getTodo = async () => {
  const response = await request(app)
    .get('/api/todos')
    .set('Accept', 'application/json')
    .expect('Content-type', /application\/json/)
    .expect(200);
  return response.body;
};

const errorIds = [
  0,
  -1,
]

describe('test [DELETE /api/todos]', () => {
  errorIds.forEach((errorId) => {
    it(`idに不正な値（${errorId}を設定して送信した場合、statusCode:400となること`, async () => {

      const response = await request(app)
        .delete(`/api/todos/${errorId}`)
        .set('Accept', 'application/json')
        .expect('Content-type', /application\/json/)
        .expect(400);

      assert.deepEqual(response.body, { message: 'idの入力が不正です（1以上の数値）' });
    });
  });

  it('idに存在しない値を送信した場合、statusCode:400となること', async () => {
    const response = await request(app)
      .delete('/api/todos/9999')
      .set('Accept', 'application/json')
      .expect('Content-type', /application\/json/)
      .expect(400);

    assert.deepEqual(response.body, { message: '削除対象のTodoが存在しません' });
  });

  it('正常に削除されること', async () => {
    const response = await request(app)
      .delete('/api/todos/3')
      .set('Accept', 'application/json')
      .expect('Content-type', /application\/json/)
      .expect(200);

    assert.deepEqual(response.body, {
      id: 3,
      title: response.body.title,
      body: response.body.body,
      createdAt: response.body.createdAt,
      updatedAt: response.body.updatedAt
    })
  });

  it('正常に削除された場合、一覧の件数が減っていること', async () => {

    const bodyBefore = await getTodo();

    response = await request(app)
      .delete('/api/todos/4')
      .set('Accept', 'application/json')
      .expect('Content-type', /application\/json/)
      .expect(200);

    const bodyAfter = await getTodo();

    assert.equal(bodyBefore.length-1, bodyAfter.length);
  });

  it('削除したTodoがリストに存在しないこと', async () => {
    response = await request(app)
      .delete('/api/todos/5')
      .set('Accept', 'application/json')
      .expect('Content-type', /application\/json/)
      .expect(200);

    const todosAfter = await getTodo();

    const index = todosAfter.findIndex((todo) => {
      return todo.id === 5;
    })
    assert.equal(-1, index);
  })
});

