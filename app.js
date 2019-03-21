const express = require('express');
const app = express();
const todoRouter = require('./routers/todo');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/todos', todoRouter);


module.exports = app;