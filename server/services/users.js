const { User } = require('../database/models')

const usersServices = {}

usersServices.getAllUsers = async () => {
  const users = await User.findAll({
    include: [
      {
        association: 'todos'
      }
    ]
  })
  return users
}

usersServices.getUser = async (id) => {
  const user = await User.findOne({
    where: {
      id
    },
    include: [
      {
        association: 'todos'
      }
    ]
  })
  return user
}

usersServices.getUserTodos = async (id) => {
  const user = await User.findOne({
    where: {
      id
    },
    include: [
      {
        association: 'todos'
      }
    ]
  })
  const { todos } = user
  return todos || null
}

module.exports = usersServices