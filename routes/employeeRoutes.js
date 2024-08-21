const express = require('express');
const { employeeLogin } = require('../controllers/employeeController');

const router = express.Router();

router.post('/login', employeeLogin);  // Employee login route

// No need for GET /login here, as it's already defined in `index.js`

module.exports = router;
