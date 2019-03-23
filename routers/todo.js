const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo');

router.route('/').get(controller.getTodos);
router.route('/').post(controller.postTodo);
router.route('/:id').put(controller.putTodo);

module.exports = router;