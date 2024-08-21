const express = require('express');
const { createEmployee, getEmployees } = require('../controllers/adminController');

const router = express.Router();

router.post('/create-employee', createEmployee);  // Ensure createEmployee is properly imported and defined
router.get('/employees', getEmployees);           // Ensure getEmployees is properly imported and defined

module.exports = router;
