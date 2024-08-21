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

// Set up routes for authentication, admin, and employee
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/employee', employeeRoutes);

// Serve static HTML pages
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/registration.html'));
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

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Define the port and start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`HRMS Service is running on http://localhost:${PORT}`);
});

app.get('/test', (req, res) => {
  res.send('The server is working correctly!');
});

// Serve the error page for any unmatched routes
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '../views/error.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).sendFile(path.join(__dirname, '../views/error.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/home.html'));
});
