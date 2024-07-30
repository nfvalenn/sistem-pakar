const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/', resultController.createResult);
router.put('/:id', resultController.updateresult);
router.get('/', resultController.getAll);
router.get('/:id', resultController.getresultById);
router.delete('/:id', resultController.deleteresult);

module.exports = router;
