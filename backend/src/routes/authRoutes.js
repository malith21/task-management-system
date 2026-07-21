const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');

// Public routes (no authentication required)
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;