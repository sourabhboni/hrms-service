const express = require('express');
const { adminLogin, registerBusiness } = require('../controllers/authController');

const router = express.Router();

router.post('/login', adminLogin);  // Admin login route
router.post('/register', registerBusiness);  // Business registration route

// No need for GET /register here, as it's already defined in `index.js`

module.exports = router;
