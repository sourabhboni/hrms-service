const Employee = require('../models/employeeModel');

const createEmployee = async (req, res) => {
  try {
    const { employeeId, name, department, salary } = req.body;
    const employee = new Employee({ employeeId, name, department, salary });
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    console.error('Error creating employee:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error retrieving employees:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
};
