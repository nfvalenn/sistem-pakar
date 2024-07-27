const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/rulesController');

// Create a new rule
router.post('/', ruleController.createrules);

// Get all rules
router.get('/', ruleController.getAllruless);

// Get a rule by ID
router.get('/:id', ruleController.getrulesById);

// Update a rule by ID
router.put('/:id', ruleController.updaterules);

// Delete a rule by ID
router.delete('/:id', ruleController.deleterules);

module.exports = router;
