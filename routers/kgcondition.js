const express = require('express');
const router = express.Router();
const kgconditionController = require('../controllers/kgconditionController');

router.post('/', kgconditionController.createkgcondition);
router.get('/', kgconditionController.getAllkgconditions);
router.get('/:id', kgconditionController.getkgconditionById);
router.put('/:id', kgconditionController.updatekgcondition);
router.delete('/:id', kgconditionController.deletekgcondition);

module.exports = router;
