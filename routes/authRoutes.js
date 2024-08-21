const express = require('express');
const { registerBusiness, adminLogin } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerBusiness);
router.post('/login', adminLogin);


module.exports = router;
