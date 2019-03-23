const Todo = require('../../../models/Todo.js');
const assert = require('power-assert');

describe('Todo.update', () => {
  it('updateはメソッドである', () => {
    assert.equal(typeof Todo.update === 'function', true);
  });

  it('idが入力されていない場合、エラーとなる', () => {
    try {
      Todo.update({ title: 'タイトル1', body: '本文1' });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, 'idの入力が必要です');
    }
  });

  const errorIds = [
    0,
    -1,
    null,
    undefined,
    [],
    {},
    '1'
  ]

  errorIds.forEach((errorId) => {
    it(`idが${errorId}の場合、エラーとなる'`, () => {
      try {
        Todo.update({ id: 0, title: 'タイトル1', body: '本文1' });
        assert.fail();
      } catch (error) {
        assert.equal(error.message, 'idの入力が不正です（1以上の数値）');
      }
    });
  })

  it('titleが入力されていない場合、エラーとなる', () => {
    try {
      Todo.update({ id: 1, body: '本文1' });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, 'titleの入力が必要です');
    }
  });

  it('bodyが入力されていない場合、エラーとなる', () => {
    try {
      Todo.update({ id: 1, title: 'タイトル1' });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, 'bodyの入力が必要です');
    }
  });

  it('idに存在しない値が入力されている場合、エラーとなる', () => {
    try {
      Todo.update({ id: 999, title: 'タイトル1', body: '本文1' });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, '更新対象のTodoが存在しません');
    }
  });

  it('更新されたTodoが返却されてくる', () => {
    const data = {
      id: 1,
      title: 'ダミータイトル1',
      body: 'ダミーボディー1'
    };
    const todo = Todo.update(data);
    assert.deepEqual(todo, {
      id: data.id,
      title: data.title,
      body: data.body,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    });
    const todos = Todo.findAll();
    assert.deepEqual( todos[0], todo);
  })

  it('更新された場合、updatedAtが更新されていること', () => {
    const data = {
      id: 1,
      title: 'ダミータイトル1',
      body: 'ダミーボディー1'
    }
    const todo = Todo.update(data);
    assert.equal(todo.createdAt < todo.updatedAt,true);
  })

  it('更新したTodoがリストへ追加されても一覧の件数は変わらない', () => {
    const data = {
      id: 1,
      title: 'updateダミータイトル1',
      body: 'updateダミーボディー1'
    }
    const lenBefore = Todo.findAll().length;
    const todo = Todo.update(data);
    const lenAfter = Todo.findAll().length;
    assert.equal(lenBefore, lenAfter);
  })

});


