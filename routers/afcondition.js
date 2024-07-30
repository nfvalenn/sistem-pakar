const express = require('express');
const router = express.Router();
const afConditionController = require('../controllers/afConditionController');

// Routes for AfCondition
router.post('/', afConditionController.createafcondition);
router.get('/', afConditionController.getAllafconditions);
router.get('/:id', afConditionController.getafconditionById);
router.put('/:id', afConditionController.updateafcondition);
router.delete('/:id', afConditionController.deleteafcondition);

module.exports = router;
