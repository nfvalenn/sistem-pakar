const express = require('express');
const router = express.Router();
const HConditionController = require('../controllers/hConditionController');

// Route untuk mengelola HCondition
router.post('/h-condition', HConditionController.createhcondition);
router.get('/h-condition', HConditionController.getAllhconditions);
router.get('/h-condition:id', HConditionController.gethconditionById);
router.put('/h-condition:id', HConditionController.updatehcondition);
router.delete('/h-condition:id', HConditionController.updatehcondition);

module.exports = router;
