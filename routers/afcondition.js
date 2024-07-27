const express = require('express');
const router = express.Router();
const afConditionController = require('../controllers/afConditionController');

// Routes for AfCondition
router.post('/af-conditions', afConditionController.createafcondition);
router.get('/af-conditions', afConditionController.getAllafconditions);
router.get('/af-conditions/:id', afConditionController.getafconditionById);
router.put('/af-conditions/:id', afConditionController.updateafcondition);
router.delete('/af-conditions/:id', afConditionController.deleteafcondition);

module.exports = router;
