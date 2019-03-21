const Todo = require('../../../models/Todo.js');
const assert = require('power-assert');

describe('Todo.create', () => {
  it('createはメソッドである', () => {
    assert.equal(typeof Todo.create === 'function', true);
  });

  it('titleが入力されていない場合、エラーとなる', () => {
    try{
      Todo.create({body:'本文1'});
      assert.fail();
    }catch(error){
      assert.equal(error.message, 'titleの入力が必要です');
    }
  });

  it('bodyが入力されていない場合、エラーとなる', () => {
    try{
      Todo.create({title:'タイトル1'});
      assert.fail();
    }catch(error){
      assert.equal(error.message, 'bodyの入力が必要です');
    }
  });
  
  it('新規追加されたTodoが返却されてくる', () => {
    const data = {
      title:'ダミータイトル1',
      body:'ダミーボディー1'
    }
    const todo = Todo.create(data);
    assert.deepEqual( todo, {
      id: todo.id,
      title: data.title,
      body: data.body,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    })
  })

  it('新規追加したTodoがリストへ追加されている', () => {
    const lenBefore = Todo.findAll().length;
    const todo = Todo.create({title:'ダミータイトル2', body:'ダミーボディー2'});
    const lenAfter = Todo.findAll().length;
    assert.equal(lenBefore+1, lenAfter);
  })

});


