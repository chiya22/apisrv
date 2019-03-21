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
  }
};
