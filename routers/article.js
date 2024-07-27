const express = require('express');
const router = express.Router();
const articleController = require('../controllers/artilceController');
const upload = require('../middleware/uploadMiddleware'); // Pastikan path ini benar

router.post('/articles', upload.single('image'), articleController.createArticle);
router.put('/articles/:id', upload.single('image'), articleController.updateArticle);

// Endpoint untuk mendapatkan semua artikel
router.get('/articles', articleController.getAllArticles);

// Endpoint untuk mendapatkan artikel berdasarkan ID
router.get('/articles/:id', articleController.getArticleById);

// Endpoint untuk memperbarui artikel berdasarkan ID
//router.put('/articles/:id', articleController.updateArticle);

// Endpoint untuk menghapus artikel berdasarkan ID
router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;
