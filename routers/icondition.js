const express = require('express');
const router = express.Router();
const iConditions = require('../controllers/iConditionController');

router.post('/', iConditions.create);
router.get('/', iConditions.findAll);
router.get('/:id', iConditions.findOne);
router.put('/:id', iConditions.update);
router.delete('/:id', iConditions.delete);
router.delete('/', iConditions.deleteAll);

module.exports = router;
