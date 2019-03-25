const Todo = require('../../../models/Todo.js');
const assert = require('power-assert');

describe('Todo.delete', () => {
  it('deleteはメソッドである', () => {
    assert.equal(typeof Todo.delete === 'function', true);
  });

  it('idが入力されていない場合、エラーとなる', () => {
    try {
      Todo.delete({});
      assert.fail();
    } catch (error) {
      assert.equal(error.message, 'idの入力が必要です');
    }
  });

  const errorIds = [
    0,
    -1,
  ]

  errorIds.forEach((errorId) => {
    it(`idが${errorId}の場合、エラーとなる'`, () => {
      try {
        Todo.delete({ id: errorId });
        assert.fail();
      } catch (error) {
        assert.equal(error.message, 'idの入力が不正です（1以上の数値）');
      }
    });
  })

  it('idに存在しない値が入力されている場合、エラーとなる', () => {
    try {
      Todo.delete({ id: 999 });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, '削除対象のTodoが存在しません');
    }
  });

  it('削除されたTodoが返却されてくる　削除されたTodoが一覧から削除されている', () => {
    const data = {
      id: 1
    };
    const todo = Todo.delete(data);
    assert.deepEqual(todo, {
      id: data.id,
      title: todo.title,
      body: todo.body,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    });
  })

  it('削除したTodoがリストから削除され件数も減る', () => {
    const data = {
      id: 2
    }
    const lenBefore = Todo.findAll().length;
    const todo = Todo.delete(data);
    const lenAfter = Todo.findAll().length;
    assert.equal(lenBefore - 1, lenAfter);
    const todos = Todo.findAll();
    const deletedtodo = todos.find((todo) => {
      return todo.id === data.id;
    })
    assert.deepEqual(deletedtodo, null);
  })

});


