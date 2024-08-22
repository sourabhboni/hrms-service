const express = require('express');
const { createEmployee, getEmployees } = require('../controllers/adminController');
const { ensureAdminAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to handle creating a new employee (POST request)
router.post('/create-employee', ensureAdminAuthenticated, createEmployee);

// Route to get the list of all employees (GET request)
router.get('/employees', ensureAdminAuthenticated, getEmployees);

module.exports = router;
