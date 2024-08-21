const Employee = require('../models/employeeModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

// Controller for employee login
const employeeLogin = async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Employee login attempt with email:', email);

  try {
    const employee = await Employee.findOne({ email }).populate('organization');
    if (!employee) {
      console.log('Employee not found');
      return res.status(404).json({ error: 'Employee not found' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: employee._id, organizationId: employee.organization._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Employee login successful, JWT token generated');
    res.json({ token, employee });
  } catch (error) {
    console.error('Error during employee login:', error.message);
    res.status(500).sendFile(path.join(__dirname, '../views/error.html'));
  }
};

module.exports = { adminLogin, employeeLogin };
