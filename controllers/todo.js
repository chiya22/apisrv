const Todo = require('../models/Todo');

module.exports = {
  getTodos: (req, res) => {
    const todos = Todo.findAll();
    res.status(200);
    res.json(todos);
  },
  postTodo: (req, res) => {
    try {
      const { title, body } = req.body;
      const createdTodo = Todo.create({ title, body });
      res.status(200);
      res.json(createdTodo);
    } catch (error) {
      res.status(400);
      res.json({ message: error.message });
    }
  },
  putTodo: (req, res) => {
    try {
      const id = req.params.id;
      const parsedId = parseInt(id, '10');
      const { title, body } = req.body;
      const updatedTodo = Todo.update({ id:parsedId, title, body });
      res.status(200);
      res.json(updatedTodo);
    } catch (error) {
      res.status(400);
      res.json({ message: error.message });
    }
  }
};
