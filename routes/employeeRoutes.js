const express = require('express');
const path = require('path');
const { employeeLogin } = require('../controllers/employeeController');
const { ensureEmployeeAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to serve the employee login page (GET request)
router.get('/:domain/employee/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/employee-login.html')); // Ensure this path points to your employee login HTML file
});

// Route to handle employee login (POST request)
router.post('/:domain/employee/login', employeeLogin);

// Route to serve the employee dashboard (GET request, protected)
router.get('/:domain/employee/home', ensureEmployeeAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/employee-home.html')); // Ensure this path points to your employee home HTML file
});

module.exports = router;
