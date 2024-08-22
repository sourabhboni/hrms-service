const jwt = require('jsonwebtoken');
const Organization = require('../models/organizationModel');

const ensureEmployeeAuthenticated = async (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const organization = await Organization.findById(decoded.organizationId);

        if (organization.domain !== req.params.domain) {
            return res.status(403).json({ error: 'Forbidden: Incorrect domain' });
        }

        req.employee = decoded;
        next();
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = { ensureEmployeeAuthenticated };
