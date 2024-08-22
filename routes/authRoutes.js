const express = require('express');
const path = require('path');
const { adminLogin, registerBusiness } = require('../controllers/authController');

const router = express.Router();

// Route to handle admin login (POST request)
router.post('/login', adminLogin);

// Route to handle business registration (POST request)
router.post('/register', registerBusiness);

// Route to serve the registration page (GET request)
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/registration.html')); // Make sure this path points to your registration HTML file
});

module.exports = router;
