const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos')

router.get('/new', todosController.add);
router.post('/new', todosController.create);

router.delete('/:id/delete', todosController.destroy);

router.get('/:id/edit', todosController.edit);
router.put('/:id/edit', todosController.update);

router.get('/:id', todosController.show);

router.get('/', todosController.index);

module.exports = router;
