const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Admin login handler
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Check if the password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, {
      expiresIn: '8h', // Token expires in 8 hour
    });

    res.json({
      message: 'Login successful',
      token, // Send the token to the client
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginAdmin };
