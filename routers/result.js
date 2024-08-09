const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/', resultController.createResult);
router.put('/:id', resultController.updateResult);
router.get('/', resultController.getAllResults);
router.get('/:id', resultController.getResultById);
router.delete('/:id', resultController.deleteResult);

module.exports = router;
