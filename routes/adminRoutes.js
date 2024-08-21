const express = require('express');
const { createEmployee, getEmployees, adminDashboard } = require('../controllers/adminController');
const { ensureAdminAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new employee (POST request)
router.post('/create-employee', ensureAdminAuthenticated, createEmployee);

// Route to get a list of employees (GET request)
router.get('/employees', ensureAdminAuthenticated, getEmployees);

// Route to serve the admin dashboard (GET request)
router.get('/dashboard', ensureAdminAuthenticated, adminDashboard);

module.exports = router;
