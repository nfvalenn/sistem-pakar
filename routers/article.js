const express = require('express');
const router = express.Router();
const articleController = require('../controllers/artilceController');
const upload = require('../middleware/uploadMiddleware'); // Pastikan path ini benar

//router.post('/', upload.single('image'), articleController.createArticle);
router.post('/', upload.single('image'), articleController.createArticle);
router.put('/:id', upload.single('image'), articleController.updateArticle);
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
