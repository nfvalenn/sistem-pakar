const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const { getProfileById, updateProfile, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

// Endpoint untuk mendapatkan profil pengguna
router.get('/profile', authenticateToken, getProfileById);

// Endpoint untuk mengupdate profil pengguna
router.put('/profile/:id', authenticateToken, updateProfile);

// Endpoint untuk mendapatkan semua pengguna (admin only)
router.get('/', authenticateToken, authorizeRole(['admin']), getAllUsers);

// Endpoint untuk mendapatkan pengguna berdasarkan ID (admin only)
router.get('/:id', authenticateToken, authorizeRole(['admin']), getUserById);

// Endpoint untuk mengupdate pengguna (admin only)
router.put('/:id', authenticateToken, authorizeRole(['admin']), updateUser);

// Endpoint untuk menghapus pengguna (admin only)
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteUser);

module.exports = router;
