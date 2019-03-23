const todos = [];

let nextId = 1;

class Todo {
  constructor({ title, body }) {
    this.id = nextId++;
    this.title = title;
    this.body = body;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

for (let i = 0; i < 5; i++) {
  const todo = new Todo({
    title: 'タイトル' + i + 1,
    body: '本文' + i + 1
  });
  todos.push(todo);
}

module.exports = {
  findAll: () => {
    return todos.slice();
  },
  create: ({ title, body }) => {
    if (!title) {
      throw new Error('titleの入力が必要です');
    }
    if (!body) {
      throw new Error('bodyの入力が必要です');
    }
    const todo = new Todo({
      title: title,
      body: body
    });
    todos.push(todo);
    return todo;
  },
  update: ({ id, title, body }) => {
    if (typeof id === 'number' && id <1) {
      throw new Error('idの入力が不正です（1以上の数値）');
    }
    if (!id) {
      throw new Error('idの入力が必要です');
    }
    if (!title) {
      throw new Error('titleの入力が必要です');
    }
    if (!body) {
      throw new Error('bodyの入力が必要です');
    }

    const updatedTodo = todos.find( (todo) => {
      if (todo.id === id){
        return todo;
      }
    })
    if (updatedTodo) {
      updatedTodo.title = title;
      updatedTodo.body = body;
      updatedTodo.updatedAt = new Date();
      return updatedTodo;
    } else {
      throw new Error('更新対象のTodoが存在しません');
    }
  },
  delete: () => {
    
  }
};
