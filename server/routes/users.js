const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users')

router.get('/:id/todos', usersController.showTodos);
router.get('/:id', usersController.show);
router.get('/', usersController.index);

module.exports = router;
