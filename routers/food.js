const express = require('express');
const router = express.Router();
const FoodRecommendationController = require('../controllers/foodRecomendationController');

//router.post('/bulk', FoodRecommendationController.bulkCreate);
router.post('/', FoodRecommendationController.create);
router.get('/', FoodRecommendationController.getAll);
router.get('/:id', FoodRecommendationController.getById);
router.put('/:id', FoodRecommendationController.update);
router.delete('/:id', FoodRecommendationController.delete);

module.exports = router;
