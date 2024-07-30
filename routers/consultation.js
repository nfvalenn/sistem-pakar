const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

router.post('/consultations', consultationController.create);
// router.get('/consultations', consultationController.getAll);
// router.get('/consultations/:id', consultationController.getById);
// router.put('/consultations/:id', consultationController.update);
// router.delete('/consultations/:id', consultationController.delete);

module.exports = router;
