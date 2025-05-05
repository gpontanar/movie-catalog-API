const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Registration
module.exports.registerUser = async (req, res) => {
    const { email, password, isAdmin } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, isAdmin });

        await newUser.save();
        res.status(201).json({ message: 'Registered Successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// User Login
module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign(
        { id: user._id, email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({
        access: token,
        user: {
          id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } catch (err) {
      console.error('Error during login:', err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// Retrieve User Details
module.exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};