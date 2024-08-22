const express = require('express');
const path = require('path');
const { employeeLogin } = require('../controllers/employeeController');

const router = express.Router();

// Route to handle employee login (POST request)
router.post('/login', employeeLogin);

// Route to serve the employee login page (GET request)
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/employee-login.html')); // Make sure this path points to your employee login HTML file
});

module.exports = router;
