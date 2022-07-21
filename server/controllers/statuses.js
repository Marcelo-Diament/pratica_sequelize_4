const { getAllStatuses } = require('../services/statuses')

const controller = {}

controller.index = async (req, res) => {
  const statuses = await getAllStatuses()
  res.json(statuses)
}

module.exports = controller