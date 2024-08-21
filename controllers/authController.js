const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controller for admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email }).populate('organization');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id, organizationId: admin.organization._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send the token as a response
    res.json({ token, organization: admin.organization });
  } catch (error) {
    console.error('Error during admin login:', error.message);
    res.status(500).sendFile(path.join(__dirname, '../views/error.html'));
  }
};

module.exports = { adminLogin };
