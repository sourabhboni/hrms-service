const Admin = require('../models/adminModel');
const Organization = require('../models/organizationModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

// Controller for business registration
const registerBusiness = async (req, res) => {
  const { name, domain, email, password } = req.body;

  try {
    // Check if the domain is already taken
    const existingDomain = await Organization.findOne({ domain });
    if (existingDomain) {
      return res.status(400).json({ error: 'Domain already taken' });
    }

    // Hash the admin's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const admin = new Admin({ email, password: hashedPassword });

    // Create a new organization and link the admin
    const organization = new Organization({ name, domain, admin: admin._id });
    
    // Save both admin and organization to the database
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

    // Generate a JWT token with the correct organization ID
    const token = jwt.sign({ id: admin._id, organizationId: admin.organization._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Login successful, JWT token generated');
    res.json({ token, organization: admin.organization });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { registerBusiness, adminLogin };
