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

describe('test [POST /api/todos]', () => {
  it('titleを送信ない場合、statusCode:400となること', async () => {
    const postdata = { body: "test-body" };

    const response = await request(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .expect('Content-type', /application\/json/)
      .expect(400)
      .send(postdata);

    assert.deepEqual(response.body, { message: 'titleの入力が必要です' });
  });

  it('bodyを送信ない場合、statusCode:400となること', async () => {
    const postdata = { title: "test-title" };

    const response = await request(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .expect('Content-type', /application\/json/)
      .expect(400)
      .send(postdata);

    assert.deepEqual(response.body, { message: 'bodyの入力が必要です' });
  });

  it('正常に登録されること', async () => {
    const postdata = { title: 'test-title', body: 'test-body' };

    const response = await request(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .expect('Content-type', /application\/json/)
      .expect(200)
      .send(postdata);

    assert.deepEqual(response.body, {
      id: response.body.id,
      title: postdata.title,
      body: postdata.body,
      createdAt: response.body.createdAt,
      updatedAt: response.body.updatedAt
    })
  });

  it('正常に登録された場合、一覧の件数が1件増えること', async () => {

    const bodyBefore = await getTodo();

    const postdata = { title: 'test-title', body: 'test-body' };

    response = await request(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .expect('Content-type', /application\/json/)
      .expect(200)
      .send(postdata);

    const bodyAfter = await getTodo();

    assert.equal(bodyBefore.length + 1, bodyAfter.length);
  });
});