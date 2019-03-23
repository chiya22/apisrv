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

describe('test [PUT /api/todos]', () => {
  errorIds.forEach((errorId) => {
    it(`idに不正な値（${errorId}を設定して送信した場合、statusCode:400となること`, async () => {
      const putdata = { title: "update-body", body: "update-body" };

      const response = await request(app)
        .put(`/api/todos/${errorId}`)
        .set('Accept', 'application/json')
        .expect('Content-type', /application\/json/)
        .expect(400)
        .send(putdata);

      assert.deepEqual(response.body, { message: 'idの入力が不正です（1以上の数値）' });
    });

    it('idに存在しない値を送信した場合、statusCode:400となること', async () => {
      const putdata = { title: "update-body", body: "update-body" };

      const response = await request(app)
        .put('/api/todos/9999')
        .set('Accept', 'application/json')
        .expect('Content-type', /application\/json/)
        .expect(400)
        .send(putdata);

      assert.deepEqual(response.body, { message: '更新対象のTodoが存在しません' });
    });

    it('titleを送信しない場合、statusCode:400となること', async () => {
      const putdata = { body: "update-body" };

      const response = await request(app)
        .put('/api/todos/1')
        .set('Accept', 'application/json')
        .expect('Content-type', /application\/json/)
        .expect(400)
        .send(putdata);

      assert.deepEqual(response.body, { message: 'titleの入力が必要です' });
    });

    it('bodyを送信しない場合、statusCode:400となること', async () => {
      const putdata = { title: "update-title" };

      const response = await request(app)
        .put('/api/todos/1')
        .set('Accept', 'application/json')
        .expect('Content-type', /application\/json/)
        .expect(400)
        .send(putdata);

      assert.deepEqual(response.body, { message: 'bodyの入力が必要です' });
    });

    it('正常に更新されること', async () => {
      const putdata = { title: 'update-title', body: 'update-body' };

      const response = await request(app)
        .put('/api/todos/1')
        .set('Accept', 'application/json')
        .expect('Content-type', /application\/json/)
        .expect(200)
        .send(putdata);

      assert.deepEqual(response.body, {
        id: 1,
        title: putdata.title,
        body: putdata.body,
        createdAt: response.body.createdAt,
        updatedAt: response.body.updatedAt
      })
    });

    it('正常に更新された場合、一覧の件数が増えないこと', async () => {

      const bodyBefore = await getTodo();

      const putdata = { title: 'update-title', body: 'update-body' };

      response = await request(app)
        .put('/api/todos/1')
        .set('Accept', 'application/json')
        .expect('Content-type', /application\/json/)
        .expect(200)
        .send(putdata);

      const bodyAfter = await getTodo();

      assert.equal(bodyBefore.length, bodyAfter.length);
    });

    it('更新したTodoがリストへ追加された場合、Todoの一覧の内容も異なる', async () => {
      const todosBefore = await getTodo();
      const putdata = { title: 'update-title', body: 'update-body' };

      response = await request(app)
        .put('/api/todos/1')
        .set('Accept', 'application/json')
        .expect('Content-type', /application\/json/)
        .expect(200)
        .send(putdata);

      const todosAfter = await getTodo();
      
      assert.notDeepEqual(todosBefore, todosAfter, '更新後でTodoの一覧の内容は一致しない');
    })

  });
});

