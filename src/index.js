const express = require('express');
const helmet = require('helmet');
const connectDB = require('../config/database');
const authRoutes = require('../routes/authRoutes');
const adminRoutes = require('../routes/adminRoutes');
const employeeRoutes = require('../routes/employeeRoutes');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Use Helmet to secure HTTP headers
app.use(helmet());

// Set up middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, Images)
app.use('/public', express.static(path.join(__dirname, '../public')));

// Define the root route to serve the home page or redirect to register
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html')); // Or redirect to /register
    // res.redirect('/register');
});

// Set up routes for authentication, admin, and employee
app.use('/auth', authRoutes);
app.use('/auth', adminRoutes);
app.use('/admin', adminRoutes);
app.use('/employee', employeeRoutes);

// Serve other static HTML pages
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/registration.html'));
});

// Serve the admin login page
app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin-login.html'));
});

app.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin-dashboard.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/employee-login.html'));
});

app.get('/employee/landing', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/employee-landing.html'));
});

// Error handling for unmatched routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../views/error.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).sendFile(path.join(__dirname, '../views/error.html'));
});

// Define the port and start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`HRMS Service is running on http://localhost:${PORT}`);
});
