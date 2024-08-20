const Organization = require('../models/organizationModel');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    res.json({ token, organization: admin.organization });
  } catch (error) {
    console.error('Error logging in admin:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerBusiness, adminLogin };
