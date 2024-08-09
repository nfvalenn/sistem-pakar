const express = require('express');
const router = express.Router();
const tsconditionController = require('../controllers/tsconditionController');

router.post('/', tsconditionController.createTsCondition);
router.get('/', tsconditionController.getAllTsConditions);
router.get('/:id', tsconditionController.getTsConditionById);
router.put('/:id', tsconditionController.updateTsCondition);
router.delete('/:id', tsconditionController.deleteTsCondition);

module.exports = router;
