const express = require('express');
const { employeeLogin, employeeLanding } = require('../controllers/employeeController');
const { ensureEmployeeAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to handle employee login (POST request)
router.post('/login', employeeLogin);

// Route to serve the employee login page (GET request)
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/employee-login.html'));
});

// Route to serve the employee landing page (GET request)
router.get('/home', ensureEmployeeAuthenticated, employeeLanding);

module.exports = router;
