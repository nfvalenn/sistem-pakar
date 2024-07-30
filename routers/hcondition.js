const express = require('express');
const router = express.Router();
const hconditionController = require('../controllers/hconditionController');

router.post('/', hconditionController.createhcondition);
router.get('/', hconditionController.getAllhconditions);
router.get('/:id', hconditionController.gethconditionById);
router.put('/:id', hconditionController.updatehcondition);
router.delete('/:id', hconditionController.deletehcondition);

module.exports = router;
