const express = require('express');
const router = express.Router();
const tsconditionController = require('../controllers/tsconditionController');

router.post('/', tsconditionController.createtscondition);
router.get('/', tsconditionController.getAlltsconditions);
router.get('/:id', tsconditionController.gettsconditionById);
router.put('/:id', tsconditionController.updatetscondition);
router.delete('/:id', tsconditionController.deletetscondition);

module.exports = router;
