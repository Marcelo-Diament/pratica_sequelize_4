const { getAllUsers, getUser, getUserTodos } = require('../services/users')

const controller = {}

controller.index = async (req, res) => {
  const users = await getAllUsers()
  res.json(users)
}

controller.show = async (req, res) => {
  const { id } = req.params
  const user = await getUser(id)
  res.json(user)
}

controller.showTodos = async (req, res) => {
  const { id } = req.params
  const todos = await getUserTodos(id)
  res.json(todos)
}

module.exports = controller