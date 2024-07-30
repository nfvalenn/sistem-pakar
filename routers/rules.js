const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/rulesController');

router.post('/', ruleController.createrules);
router.get('/', ruleController.getAllruless);
router.get('/:id', ruleController.getrulesById);
router.put('/:id', ruleController.updaterules);
router.delete('/:id', ruleController.deleterules);

module.exports = router;
