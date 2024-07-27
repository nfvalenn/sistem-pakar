const express = require('express');
const router = express.Router();
const KGConditionController = require('../controllers/kgConditionController');

// Route untuk mengelola KGCondition
router.post('/kg-condition', KGConditionController.createkgcondition);
router.get('kg-condition', KGConditionController.getAllkgconditions);
router.get('kg-condition:id', KGConditionController.getkgconditionById);
router.put('/kg-condition:id', KGConditionController.updatekgcondition);
router.delete('/kg-condition:id', KGConditionController.deletekgcondition);

module.exports = router;
