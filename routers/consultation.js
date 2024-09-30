const express = require('express');
const router = express.Router();
const ConsultationController = require('../controllers/consultationController');
const RiwayatKonsultasi = require('../controllers/riwayatController');
const authenticate = require('../middleware/authMiddleware'); // Middleware for authentication
const { get } = require('./rules');

// Route to create a consultation
router.post('/', authenticate, ConsultationController.create);

// Route to get consultation history by user
router.get('/history', authenticate, ConsultationController.getConsultationHistoryByUser);

// Route to get consultation by ID
router.get('/:id', authenticate, ConsultationController.getById);

// Route to get all consultations (admin access)
router.get('/', authenticate, ConsultationController.getAll);

router.get('/user', authenticate, RiwayatKonsultasi.getConsultationHistoryByUser );

module.exports = router;
