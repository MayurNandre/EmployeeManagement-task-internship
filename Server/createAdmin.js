
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initialize the Express app
const app = express();
app.use(express.json()); // To parse JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Admin model
const Admin = mongoose.model('Admin', adminSchema);

// Create Admin (First time setup)
// Only run this once to create the initial admin
const createAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: 'admin' });

    if (existingAdmin) {
      console.log('Admin already exists!');
      return;
    }

    const hashedPassword = await bcrypt.hash('mayur@admin', 10);

    const admin = new Admin({
      username: 'admin',
      password: hashedPassword,
    });

    await admin.save();
    console.log('Admin created successfully');
  } catch (err) {
    console.error('Error creating admin:', err);
  }
};

// Uncomment this line once to create the admin
// createAdmin();

// Admin Login Route
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Step 1: Find the admin by username
    const admin = await Admin.findOne({ username });

    // If no admin is found, return error
    if (!admin) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Step 2: Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Step 3: If password matches, generate a JWT token for the admin
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      'your_jwt_secret',
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return the token to the client
    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
