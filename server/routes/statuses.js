const express = require('express');
const router = express.Router();
const statusesController = require('../controllers/statuses')

router.get('/', statusesController.index);

module.exports = router;
