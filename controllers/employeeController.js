const Employee = require('../models/employeeModel');
const Organization = require('../models/organizationModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const employeeLogin = async (req, res) => {
    const { email, password } = req.body; // Assume domain is in the route params

    try {
        // Find the organization by domain
        const organization = await Organization.findOne({ domain: req.params.domain });
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        // Find the employee by email and organization
        const employee = await Employee.findOne({ email, organization: organization._id });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: employee._id, organizationId: organization._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Store the token in a cookie
        res.cookie('authToken', token, { httpOnly: true });

        // Redirect to the employee dashboard or home page
        res.redirect(`/${req.params.domain}/employee/home`);
    } catch (error) {
        console.error('Error during employee login:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { employeeLogin };
