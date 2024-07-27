const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

// Rute untuk membuat konsultasi baru
router.post('/consultations', consultationController.createconsultation);

// Rute untuk mendapatkan semua konsultasi
// router.get('/consultations', consultationController.getAllConsultations);

// // Rute untuk mendapatkan konsultasi berdasarkan ID
// router.get('/consultations/:id', consultationController.getConsultationById);

module.exports = router;
