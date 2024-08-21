const express = require('express');
const { adminLogin, registerBusiness } = require('../controllers/authController');

const router = express.Router();

router.post('/login', adminLogin);           // Ensure adminLogin is properly imported and defined
router.post('/register', registerBusiness);  // Ensure registerBusiness is properly imported and defined

module.exports = router;
