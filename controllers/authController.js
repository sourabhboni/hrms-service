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
    const existingOrganization = await Organization.findOne({ domain });
    if (existingOrganization) {
      return res.status(400).json({ error: 'Domain already taken' });
    }

    // Check if the email is already used by an admin
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the admin's password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new admin and organization
    const admin = new Admin({ email, password: hashedPassword });
    const organization = new Organization({ name, domain, admin: admin._id });

    admin.organization = organization._id;

    // Save admin and organization
    await Promise.all([admin.save(), organization.save()]);

    // Render the registration success page
    res.status(201).render('registration-success', { organization });
  } catch (error) {
    console.error('Error registering business:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email }).populate('organization');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, organizationId: admin.organization._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Store the token in a cookie
    res.cookie('authToken', token, { httpOnly: true });

    // Redirect to the admin dashboard
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error during admin login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerBusiness, adminLogin };
