const {
  getAllTodos,
  getAllTodosByUserId,
  getTodoById,
  updateTodo,
  createTodo,
  destroyTodo
} = require('../services/todos')

const controller = {}

controller.add = async (req, res) => {
  const todos = await getAllTodos()
  res.json(todos)
}
controller.create = async (req, res) => {
  const create = await createTodo(req.body)
  if (!create) {
    res.status(500).json({ msg: `Algo de errado não deu certo...` })
  }
  const todos = await getAllTodos()
  res.json(todos)
}

controller.destroy = async (req, res) => {
  const { id } = req.params
  const destroyed = await destroyTodo(id)
  if (!destroyed) {
    res.status(404).json({ msg: `Não há todo com o ID ${id}` })
  }
  const todos = await getAllTodos()
  res.json(todos)
}

controller.edit = async (req, res) => {
  const { id } = req.params
  const todo = await getTodoById(id)
  res.json(todo)
}
controller.update = async (req, res) => {
  const { id } = req.params
  const update = await updateTodo(id, req.body)
  if (!update) {
    res.status(404).json({ msg: `Não há todo com o ID ${id}` })
  }
  const todos = await getAllTodos()
  res.json(todos)
}

controller.show = async (req, res) => {
  const { id } = req.params
  const todo = await getTodoById(id)
  if (!todo) {
    res.status(404).json({ msg: `Não há todo com o ID ${id}` })
  }
  res.json(todo)
}

controller.index = async (req, res) => {
  const { userId } = req.query
  const todos = userId ? await getAllTodosByUserId(userId) : await getAllTodos()
  res.json(todos)
}

module.exports = controller