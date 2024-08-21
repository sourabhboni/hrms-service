console.log('Current Directory:', __dirname);

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');


// Import route files and middleware
const connectDB = require('../config/database');
const authRoutes = require('../routes/authRoutes');
const adminRoutes = require('../routes/adminRoutes');
const employeeRoutes = require('../routes/employeeRoutes');
const { ensureAdminAuthenticated } = require('../middleware/authMiddleware'); // Import the middleware

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
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, Images)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use the routes defined in your route files
app.use('/auth', authRoutes);          // Routes related to authentication (login, register)
app.use('/employee', employeeRoutes);  // Routes related to employee operations

// Protect the admin routes with the ensureAdminAuthenticated middleware
app.use('/admin', ensureAdminAuthenticated, adminRoutes); // Admin routes protected by middleware

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.html'));
});

// Error handling for unmatched routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views/error.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).sendFile(path.join(__dirname, 'views/error.html'));
});

// Define the port and start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`HRMS Service is running on http://localhost:${PORT}`);
});
