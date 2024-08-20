const Employee = require('../models/employeeModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    res.json({ token, employee });
  } catch (error) {
    console.error('Error logging in employee:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { employeeLogin };
