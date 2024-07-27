const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

// Rute untuk Result
router.post('/results', resultController.createResult); // Menggunakan createResult untuk menambahkan hasil baru
router.put('/results/:id', resultController.updateresult); // Menggunakan updateResult untuk memperbarui hasil
router.get('/results', resultController.getAllresults);
router.get('/results/:id', resultController.getresultById);
router.delete('/results/:id', resultController.deleteresult);

module.exports = router;
