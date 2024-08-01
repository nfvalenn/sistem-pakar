const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const router = express.Router();

// Endpoint untuk registrasi pengguna
router.post('/register', register);

// Endpoint untuk login
router.post('/login', login);

// Endpoint untuk logout
router.post('/logout', logout);

module.exports = router;
