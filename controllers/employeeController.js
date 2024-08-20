const Employee = require('../models/employeeModel');
const bcrypt = require('bcryptjs');

// Controller to create an employee
const createEmployee = async (req, res) => {
  const { employeeId, name, department, email, password } = req.body;
  const organization = req.organization;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = new Employee({ employeeId, name, department, email, password: hashedPassword, organization: organization._id });
    await employee.save();

    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    console.error('Error creating employee:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all employees for an organization
const getEmployees = async (req, res) => {
  const organization = req.organization;

  try {
    const employees = await Employee.find({ organization: organization._id });
    res.json(employees);
  } catch (error) {
    console.error('Error retrieving employees:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createEmployee, getEmployees };
