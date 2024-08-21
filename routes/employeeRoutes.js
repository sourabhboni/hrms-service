const express = require('express');
const { employeeLogin, getEmployeeProfile, updateEmployeeProfile } = require('../controllers/employeeController');

const router = express.Router();

router.post('/login', employeeLogin);              // Ensure employeeLogin is properly imported and defined
router.get('/profile', getEmployeeProfile);        // Ensure getEmployeeProfile is properly imported and defined
router.put('/profile', updateEmployeeProfile);     // Ensure updateEmployeeProfile is properly imported and defined

module.exports = router;
