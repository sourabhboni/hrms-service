const Employee = require('../models/employeeModel');
const Organization = require('../models/organizationModel');
const path = require('path');

// Controller for creating an employee
const createEmployee = async (req, res) => {
  const { name, department, email, password, role } = req.body;

  try {
    const organizationId = req.admin.organizationId;

    // Create a new employee
    const employee = new Employee({
      name,
      department,
      email,
      password: await bcrypt.hash(password, 12),
      role,
      organization: organizationId,
    });

    await employee.save();

    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    console.error('Error creating employee:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for getting a list of employees
const getEmployees = async (req, res) => {
  try {
    const organizationId = req.admin.organizationId;
    const employees = await Employee.find({ organization: organizationId });

    res.status(200).json({ employees });
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createEmployee, getEmployees };
