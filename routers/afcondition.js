const express = require('express');
const router = express.Router();
const afConditionController = require('../controllers/afConditionController');

// Routes for AfCondition
router.post('/', afConditionController.createAfCondition);
router.get('/', afConditionController.getAllAfConditions);
router.get('/:id', afConditionController.getAfConditionById);
router.put('/:id', afConditionController.updateAfCondition);
router.delete('/:id', afConditionController.deleteAfCondition);

module.exports = router;
