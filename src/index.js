const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const connectDB = require('../config/database');

// Import route files
const authRoutes = require('../routes/authRoutes');
const employeeRoutes = require('../routes/employeeRoutes');
const { ensureAdminAuthenticated } = require('../middleware/authMiddleware');

const app = express();

// Connect to MongoDB (if using a MongoDB database)
connectDB();

// Use Helmet to set secure HTTP headers
app.use(helmet());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serve static files (CSS, JS, Images)
app.use('/public', express.static(path.join(__dirname, '../public')));

// Use the routes defined in your route files
app.use('/auth', authRoutes);          // Routes for authentication (register, login)
app.use('/employee', employeeRoutes);  // Routes for employee operations (login)

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'));
});

// Protect admin routes that should require authentication
app.use('/admin/dashboard', ensureAdminAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin-dashboard.html')); // Ensure this path points to your admin dashboard HTML file
});

// Serve the admin login page (GET request)
app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin-login.html'));
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
    console.log(`HRMS Service is running on port ${PORT}`);
});
