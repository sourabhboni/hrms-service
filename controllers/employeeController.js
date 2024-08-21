const Employee = require('../models/employeeModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

// Controller for employee login
const employeeLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email }).populate('organization');
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: employee._id, organizationId: employee.organization._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Store the token in a cookie
    res.cookie('authToken', token, { httpOnly: true });

    // Redirect to the employee dashboard or home page
    res.redirect('/employee/home');
  } catch (error) {
    console.error('Error during employee login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for getting employee profile
const getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id).populate('organization');
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ employee });
  } catch (error) {
    console.error('Error fetching employee profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for updating employee profile
const updateEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    Object.assign(employee, req.body); // Update employee fields with request body data

    await employee.save();

    res.status(200).json({ message: 'Profile updated successfully', employee });
  } catch (error) {
    console.error('Error updating employee profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { employeeLogin, getEmployeeProfile, updateEmployeeProfile };
