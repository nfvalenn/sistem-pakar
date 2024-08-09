const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const authMiddleware = require('../middleware/authMiddleware'); // Sesuaikan path sesuai struktur folder Anda


router.post('/', consultationController.create);
// router.get('/consultations', consultationController.getAll);
// router.get('/consultations/:id', consultationController.getById);
// router.put('/consultations/:id', consultationController.update);
// router.delete('/consultations/:id', consultationController.delete);
router.get('/history', authMiddleware, consultationController.getConsultationHistoryByUser);
router.get('/:id', authMiddleware, consultationController.getById);

module.exports = router;
