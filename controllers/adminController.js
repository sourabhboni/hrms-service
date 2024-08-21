const Employee = require('../models/employeeModel');
const Organization = require('../models/organizationModel');
const bcrypt = require('bcryptjs');

// Controller to create a new employee
const createEmployee = async (req, res) => {
    const { name, department, email, password, role } = req.body;

    try {
        const organizationId = req.admin.organizationId; // Get the organization ID from the authenticated admin

        // Hash the employee's password and create a new employee
        const employee = new Employee({
            name,
            department,
            email,
            password: await bcrypt.hash(password, 12),
            role,
            organization: organizationId,
        });

        await employee.save(); // Save the new employee to the database

        res.status(201).json({ message: 'Employee created successfully', employee });
    } catch (error) {
        console.error('Error creating employee:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to get a list of employees in the organization
const getEmployees = async (req, res) => {
    try {
        const organizationId = req.admin.organizationId; // Get the organization ID from the authenticated admin
        const employees = await Employee.find({ organization: organizationId }); // Find employees in the organization

        res.status(200).json({ employees });
    } catch (error) {
        console.error('Error fetching employees:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller for admin dashboard rendering (if using templates)
const adminDashboard = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/admin-dashboard.html'));
    } catch (error) {
        console.error('Error rendering admin dashboard:', error.message);
        res.status(500).sendFile(path.join(__dirname, '../views/error.html'));
    }
};

module.exports = { createEmployee, getEmployees, adminDashboard };
