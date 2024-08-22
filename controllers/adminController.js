const bcrypt = require('bcryptjs');
const Employee = require('../models/employeeModel');

// Controller for creating an employee
const createEmployee = async (req, res) => {
    const { name, department, email, password, role } = req.body;

    try {
        const organizationId = req.admin.organizationId;

        const employeeId = `EMP-${Date.now()}`; // Simple example using a timestamp

        const hashedPassword = await bcrypt.hash(password, 12);

        const employee = new Employee({
            employeeId, // Use the generated employeeId
            name,
            department,
            email,
            password: hashedPassword,
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
      console.log('Fetching employees for organization ID:', organizationId);

      // Fetch employees from the database
      const employees = await Employee.find({ organization: organizationId });
      console.log('Employees found:', employees);

      // Render the employees view and pass the employee data
      res.render('view-employees', { employees });
  } catch (error) {
      console.error('Error fetching employees:', error.message);
      console.error('Stack trace:', error.stack);
      res.status(500).send('Internal Server Error');
  }
};

// Controller for getting details of a specific employee
const getEmployeeDetails = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId).populate('organization');

        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        res.render('employee-details', { employee });
    } catch (error) {
        console.error('Error fetching employee details:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { createEmployee, getEmployees, getEmployeeDetails };
