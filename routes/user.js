const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../auth');

// User Registration
router.post('/register', userController.registerUser);

// User Login
router.post('/login', userController.loginUser);

// Retrieve User Details
router.get('/details', auth.verify, userController.getUserDetails);

module.exports = router;