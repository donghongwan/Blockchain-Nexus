// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration
router.post('/register', userController.registerUser );

// User login
router.post('/login', userController.loginUser );

// Get user profile
router.get('/:id', userController.getUser Profile);

module.exports = router;
