const Admin = require('../models/adminModel');
const Organization = require('../models/organizationModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

// Controller for business registration
const registerBusiness = async (req, res) => {
  const { name, domain, email, password } = req.body;

  console.log('Registering business:', { name, domain, email });

  try {
    // Check if the domain is already taken
    const existingOrganization = await Organization.findOne({ domain });
    if (existingOrganization) {
      console.log('Domain already taken');
      return res.status(400).json({ error: 'Domain already taken' });
    }

    // Check if the email is already used by an admin
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Email already registered');
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the admin's password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new admin instance (without saving yet)
    const admin = new Admin({
      email,
      password: hashedPassword
      // organization field will be set after creating organization
    });

    // Create a new organization instance
    const organization = new Organization({
      name,
      domain,
      admin: admin._id
    });

    // Set the organization reference in admin
    admin.organization = organization._id;

    // Save both admin and organization
    await Promise.all([admin.save(), organization.save()]);

    console.log('Business registered successfully');
    res.status(201).json({ message: 'Business registered successfully', organization });
  } catch (error) {
    console.error('Error registering business:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log('Admin login attempt:', email);

  try {
    // Find the admin by email and populate the organization
    const admin = await Admin.findOne({ email }).populate('organization');

    if (!admin) {
      console.log('Admin not found for email:', email);
      return res.status(404).json({ error: 'Admin not found' });
    }

    console.log('Admin found:', admin.email);

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      console.log('Invalid password for admin:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('Password verified for admin:', email);

    // Generate JWT token
    const tokenPayload = {
      adminId: admin._id,
      organizationId: admin.organization._id
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('JWT token generated for admin:', email);

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        email: admin.email,
        organization: {
          name: admin.organization.name,
          domain: admin.organization.domain,
          _id: admin.organization._id
        }
      }
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { registerBusiness, adminLogin };
