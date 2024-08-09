const express = require('express');
const router = express.Router();
const hconditionController = require('../controllers/hconditionController');

router.post('/', hconditionController.createHCondition);
router.get('/', hconditionController.getAllHConditions);
router.get('/:id', hconditionController.getHConditionById);
router.put('/:id', hconditionController.updateHCondition);
router.delete('/:id', hconditionController.deleteHCondition);

module.exports = router;
