const Employee = require('../models/employeeModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controller to handle employee login
const employeeLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const employee = await Employee.findOne({ email }).populate('organization');
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Check if the provided password matches the stored password
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token for the employee
        const token = jwt.sign({ id: employee._id, organizationId: employee.organization._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Store the token in a cookie
        res.cookie('authToken', token, { httpOnly: true });

        // Redirect the employee to their home/landing page
        res.redirect('/employee/home');
    } catch (error) {
        console.error('Error during employee login:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to render employee landing page
const employeeLanding = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/employee-landing.html'));
    } catch (error) {
        console.error('Error rendering employee landing page:', error.message);
        res.status(500).sendFile(path.join(__dirname, '../views/error.html'));
    }
};

module.exports = { employeeLogin, employeeLanding };
