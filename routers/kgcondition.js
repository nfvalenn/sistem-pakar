const express = require('express');
const router = express.Router();
const kgconditionController = require('../controllers/kgconditionController');

router.post('/', kgconditionController.createKgCondition);
router.get('/', kgconditionController.getAllKgConditions);
router.get('/:id', kgconditionController.getKgConditionById);
router.put('/:id', kgconditionController.updateKgCondition);
router.delete('/:id', kgconditionController.deleteKgCondition);

module.exports = router;
