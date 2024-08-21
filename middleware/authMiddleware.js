const jwt = require('jsonwebtoken');

// Middleware to ensure that the admin is authenticated
const ensureAdminAuthenticated = (req, res, next) => {
    const token = req.cookies.authToken; // Assuming the token is stored in a cookie

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded; // Attach the decoded token to the request object
        next();
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

// Middleware to ensure that the employee is authenticated
const ensureEmployeeAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.employee = decoded;
        next();
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        res.status(401).json({ error: 'Invalid token, authorization denied' });
    }
};

module.exports = {
    ensureAdminAuthenticated,
    ensureEmployeeAuthenticated
};
