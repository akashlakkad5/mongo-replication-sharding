const express = require('express');
const router = express.Router();
const { users } = require('../controller');
const { apiHandler } = require('../utils/payload');

router.post('/create', apiHandler(users.userCreate));
router.post('/login', apiHandler(users.userLogin));

module.exports = router;        