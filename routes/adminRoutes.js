const express = require('express');
const { createEmployee, getEmployees } = require('../controllers/employeeController');
const { ensureAdminAuthenticated } = require('../middleware/authMiddleware');
const { registerBusiness, adminLogin } = require('../controllers/adminController');
const path = require('path');

const router = express.Router();

// Business registration route
router.post('/register', registerBusiness);

// Admin login route
router.post('/login', adminLogin);

// Admin Dashboard Route
router.get('/dashboard', ensureAdminAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin-dashboard.html'));
});

// Route to create a new employee
router.post('/create-employee', ensureAdminAuthenticated, createEmployee);

// Route to get all employees
router.get('/employees', ensureAdminAuthenticated, getEmployees);

module.exports = router;
