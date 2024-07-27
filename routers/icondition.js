const express = require('express');
const router = express.Router();
const IConditionController = require('../controllers/iConditionController');

// Route untuk mengelola ICondition
router.post('/create', IConditionController.createicondition);
router.get('/', IConditionController.getAlliconditions);
router.get('/:id', IConditionController.geticonditionById);
router.put('/:id', IConditionController.updateicondition);
router.delete('/:id', IConditionController.deleteicondition);

module.exports = router;
