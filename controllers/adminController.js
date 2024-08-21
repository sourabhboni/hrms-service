const Organization = require('../models/organizationModel');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

// Controller for business registration
const registerBusiness = async (req, res) => {
  const { name, domain, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ email, password: hashedPassword });
    const organization = new Organization({ name, domain, admin: admin._id });

    await admin.save();
    await organization.save();

    res.status(201).json({ message: 'Business registered successfully', organization });
  } catch (error) {
    console.error('Error registering business:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt with email:', email);

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email }).populate('organization');
    if (!admin) {
      console.log('Admin not found');
      return res.status(404).json({ error: 'Admin not found' });
    }

    console.log('Admin found:', admin.email);

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('Password match successful');

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id, organizationId: admin.organization._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Login successful, JWT token generated');
    res.json({ token, organization: admin.organization });
  } catch (error) {
    console.error('Error during admin login:', error);  // More detailed logging
    res.status(500).json({ error: 'Internal Server Error' });  // Return error as JSON
  }
};

module.exports = { registerBusiness, adminLogin };
