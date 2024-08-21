const express = require('express');
const { createEmployee, getEmployees, employeeLogin } = require('../controllers/employeeController');

const router = express.Router();

router.post('/employee/login', employeeLogin);
router.post('/create', createEmployee);
router.get('/', getEmployees);

module.exports = router;
