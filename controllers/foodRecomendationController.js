const { FoodRecommendation } = require('../models');

class FoodRecommendationController {
    // Create a new food recommendation
    async create(req, res) {
        try {
            const { name, porsi, weight, calories, protein, fat, time, result_id } = req.body;

            // Validate input
            // if (!name || !porsi || !weight || !calories || !protein || !fat || !time || !result_id ) {
            //     return res.status(400).json({ error: 'Missing required fields' });
            // }

            const newRecommendation = await FoodRecommendation.create({
                name,
                porsi,
                weight,
                calories,
                protein,
                fat,
                time,
                result_id
            });

            res.status(201).json(newRecommendation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all food recommendations with pagination
    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1; // Default to page 1
            const limit = parseInt(req.query.limit) || 10; // Default to limit of 10
            const offset = (page - 1) * limit;

            const { count, rows } = await FoodRecommendation.findAndCountAll({
                limit,
                offset,
            });

            res.status(200).json({
                totalCount: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                items: rows,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a food recommendation by ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const recommendation = await FoodRecommendation.findByPk(id);

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
            const { name, porsi, weight, calories, protein, fat, time, result_id } = req.body;

            const recommendation = await FoodRecommendation.findByPk(id);

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
                time,
                result_id
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
            const recommendation = await FoodRecommendation.findByPk(id);

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
