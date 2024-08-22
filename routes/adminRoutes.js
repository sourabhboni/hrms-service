const express = require('express');
const { createEmployee, getEmployees ,getEmployeeDetails} = require('../controllers/adminController');
const { ensureAdminAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to handle creating a new employee (POST request)
router.post('/create-employee', ensureAdminAuthenticated, createEmployee);

// Route to get the list of all employees (GET request)
router.get('/employees', ensureAdminAuthenticated, getEmployees);

// Route to handle admin logout
router.get('/logout', ensureAdminAuthenticated, (req, res) => {
    res.clearCookie('authToken'); // Clear the auth token cookie
    res.redirect('/admin/login'); // Redirect to the admin login page
});

// Route to get details of a specific employee
router.get('/employees/:id', ensureAdminAuthenticated, getEmployeeDetails);

module.exports = router;
