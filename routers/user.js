const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Rute untuk mendapatkan profil pengguna yang terautentikasi
router.get('/profile', authenticateToken, userController.getProfileById);

// Rute untuk memperbarui profil pengguna
router.put('/profile', authenticateToken, userController.updateProfile);

// Rute untuk mendapatkan semua pengguna (mungkin untuk admin)
router.get('/', userController.getAllUsers);

// Rute untuk mendapatkan pengguna berdasarkan ID
router.get('/:id', userController.getUserById);

// Rute untuk memperbarui pengguna berdasarkan ID
router.put('/:id', userController.updateUser);

// Rute untuk menghapus pengguna berdasarkan ID
router.delete('/:id', userController.deleteUser);

// Rute untuk membuat pengguna baru
router.post('/', userController.createUser);

module.exports = router;
