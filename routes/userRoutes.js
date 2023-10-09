const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const verifyJWT = require('../middleware/verifyJWT');

// Authentication
router.post('/users/login', userController.userLogin);

// Registration
router.post('/users', userController.registerUser);

// Get Current User
router.get('/users', verifyJWT, userController.getCurrentUser);

// Update User
router.put('/users', verifyJWT, userController.updateUser);

module.exports = router;