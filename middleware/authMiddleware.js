const jwt = require('jsonwebtoken');

// Middleware to ensure the admin is authenticated
const ensureAdminAuthenticated = (req, res, next) => {
    const token = req.cookies.authToken; // Retrieve token from cookies

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded; // Attach decoded token to the request object
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

// Middleware to ensure the employee is authenticated
const ensureEmployeeAuthenticated = (req, res, next) => {
    const token = req.cookies.authToken; // Retrieve token from cookies

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.employee = decoded; // Attach decoded token to the request object
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = { ensureAdminAuthenticated, ensureEmployeeAuthenticated };
