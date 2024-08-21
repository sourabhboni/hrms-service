const express = require('express');
const path = require('path');
const { adminLogin, registerBusiness } = require('../controllers/authController');

const router = express.Router();

// Route to handle business registration (POST request)
router.post('/register', registerBusiness);

// Route to serve the registration page (GET request)
router.get('/register', (req, res) => {
    console.log("Serving register.html");
    res.sendFile(path.join(__dirname, '../views/register.html')); // Make sure this path is correct
});

module.exports = router;
