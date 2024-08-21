const express = require('express');
const path = require('path');
const { adminLogin, registerBusiness } = require('../controllers/authController');

const router = express.Router();

// POST route to handle business registration
router.post('/register', registerBusiness);

// GET route to serve the registration page
router.get('/register', (req, res) => {
    console.log("GET /register accessed");
    res.sendFile(path.join(__dirname, '../views/registration.html'));
});

module.exports = router;
