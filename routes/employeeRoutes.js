const express = require('express');
const path = require('path');
const { employeeLogin } = require('../controllers/employeeController');

const router = express.Router();

// POST route to handle employee login
router.post('/login', employeeLogin);

// GET route to serve the employee login page
router.get('/login', (req, res) => {
    console.log("GET /employee/login accessed");
    res.sendFile(path.join(__dirname, '../views/employee-login.html'));
});

module.exports = router;
