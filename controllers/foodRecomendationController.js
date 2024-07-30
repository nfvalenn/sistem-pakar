const { foodRecomendation } = require('../models');

class FoodRecommendationController {

    // controllers/foodRecommendationController.js
    async bulkCreate(req, res) {
        try {
        const foodRecommendations = req.body; // Asumsikan data dikirim sebagai array

        // Validasi format data jika perlu
        if (!Array.isArray(foodRecommendations) || foodRecommendations.length === 0) {
            return res.status(400).json({ error: 'Invalid data format' });
        }

        // Bulk insert data makanan
        const result = await foodRecomendation.bulkCreate(foodRecommendations);

        res.status(201).json(result);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

  // Metode lainnya jika perlu


    // Create a new food recommendation
    async create(req, res) {
        try {
            const { name, porsi, weight, calories, protein, fat, time } = req.body;

            // Validate input
            if (!name || !porsi || !weight || !calories || !protein || !fat) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const newRecommendation = await foodRecomendation.create({
                name,
                porsi,
                weight,
                calories,
                protein,
                fat,
                time
            });

            res.status(201).json(newRecommendation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all food recommendations
    async getAll(req, res) {
        try {
            const recommendations = await foodRecomendation.findAll();
            res.status(200).json(recommendations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a specific food recommendation by ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const recommendation = await foodRecomendation.findByPk(id);

            if (!recommendation) {
                return res.status(404).json({ error: 'Food recommendation not found' });
            }

            res.status(200).json(recommendation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update a food recommendation by ID
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, porsi, weight, calories, protein, fat, time } = req.body;

            const recommendation = await foodRecommendation.findByPk(id);

            if (!recommendation) {
                return res.status(404).json({ error: 'Food recommendation not found' });
            }

            const updatedRecommendation = await recommendation.update({
                name,
                porsi,
                weight,
                calories,
                protein,
                fat,
                time
            });

            res.status(200).json(updatedRecommendation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete a food recommendation by ID
    async delete(req, res) {
        try {
            const { id } = req.params;
            const recommendation = await foodRecommendation.findByPk(id);

            if (!recommendation) {
                return res.status(404).json({ error: 'Food recommendation not found' });
            }

            await recommendation.destroy();
            res.status(204).send(); // No content
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new FoodRecommendationController();
