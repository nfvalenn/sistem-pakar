const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Impor middleware autentikasi
const router = express.Router();

// Endpoint untuk registrasi pengguna
router.post('/register', register);

// Endpoint untuk login
router.post('/login', login);

// Endpoint untuk logout dengan middleware autentikasi
router.post('/logout', authMiddleware, logout);

module.exports = router;
