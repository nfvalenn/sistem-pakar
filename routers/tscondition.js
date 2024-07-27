const express = require('express');
const router = express.Router();
const TSConditionController = require('../controllers/tsConditionController');

// Route untuk mengelola TSCondition
router.post('/ts-condition', TSConditionController.createtscondition);
router.get('/ts-condition', TSConditionController.getAlltsconditions);
router.put('/ts-condition:id', TSConditionController.updatetscondition);
router.delete('/ts-condition:id', TSConditionController.deletetscondition);

module.exports = router;
