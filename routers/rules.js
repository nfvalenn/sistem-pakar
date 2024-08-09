const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/rulesController');

router.post('/', ruleController.createRule);
router.get('/', ruleController.getAllRules);
router.get('/:id', ruleController.getRuleById);
router.put('/:id', ruleController.updateRule);
router.delete('/:id', ruleController.deleteRule);

module.exports = router;
