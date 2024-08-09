const { Consultation, User, ICondition, AfCondition, KgCondition, HCondition, TsCondition, Result, Rule, FoodRecommendation } = require('../models');

class ConsultationController {
    async create(req, res) {
        try {
            const { weight, height, age, gender, activityLevelId, bloodSugarId, hba1cId, stressLevelId, userId } = req.body;

            // Calculate IMT (BMI)
            const imt = weight / ((height / 100) ** 2);

            // Determine i_condition_id based on BMI
            let imtId;
            if (imt < 17) {
                imtId = 1;
            } else if (imt >= 17 && imt < 18.4) {
                imtId = 2;
            } else if (imt >= 18.5 && imt <= 25.0) {
                imtId = 3;
            } else if (imt >= 25.1 && imt <= 27.0) {
                imtId = 4;
            } else {
                imtId = 5;
            }

            // Validate existence of IMT condition
            const imtCondition = await ICondition.findByPk(imtId);
            if (!imtCondition) {
                return res.status(404).json({ error: `IMT condition with id ${imtId} not found` });
            }

            // Validate existence of each other condition
            const [activityLevel, bloodSugar, hba1c, stressLevel] = await Promise.all([
                AfCondition.findByPk(activityLevelId),
                KgCondition.findByPk(bloodSugarId),
                HCondition.findByPk(hba1cId),
                TsCondition.findByPk(stressLevelId)
            ]);

            if (!activityLevel || !bloodSugar || !hba1c || !stressLevel) {
                return res.status(404).json({ error: 'One or more conditions not found' });
            }

            // Create a new Consultation
            const newConsultation = await Consultation.create({
                weight,
                height,
                age,
                gender,
                imtId,
                activityLevelId,
                bloodSugarId,
                hba1cId,
                stressLevelId,
                imt,
                userId
            });

            // Find the Rule that match the conditions of the Consultation
            const matchedRule = await Rule.findAll({
                where: {
                    i_condition_id: imtId,
                    af_condition_id: activityLevelId,
                    kg_condition_id: bloodSugarId,
                    ts_condition_id: stressLevelId,
                    h_condition_id: hba1cId
                }
            });
            console.log('Found Rule:', matchedRule);

            if (matchedRule.length === 0) {
                return res.status(404).json({ error: 'No matching Rule found for the given conditions' });
            }

            // Calculate the combined CF using the combining formula
            let combinedCF = 0;
            for (const rule of matchedRule) {
                combinedCF = combinedCF + rule.cf * (1 - combinedCF);
            }

            // Get the Result based on the highest CF
            const highestCFRule = matchedRule.reduce((max, rule) => rule.cf > max.cf ? rule : max, { cf: -Infinity });
            console.log('Highest CF Rule:', highestCFRule);

            const highestCFResult = await Result.findOne({ where: { id: highestCFRule.result_id } });
            if (!highestCFResult) {
                return res.status(404).json({ error: 'No Result found for the highest CF' });
            }

            console.log('Found Result:', highestCFResult);

            // Get food recommendations based on the Result with the highest CF
            const recommendations = await FoodRecommendation.findAll({ where: { result_id: highestCFResult.id } });
            console.log('Food Recommendations:', recommendations);

            // Send response with Result and recommendations
            res.json({ 
                Result: highestCFResult.name, 
                foodRecommendations: recommendations 
            });
        } catch (error) {
            console.error('Error creating Consultation:', error);
            res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
    }

    async getConsultationHistoryByUser(req, res) {
        try {
            const { id: userId } = req.user;
    
            const consultations = await db.Consultation.findAll({
                where: { userId },
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.AfCondition, as: 'activityLevel' },
                    { model: db.KgCondition, as: 'bloodSugar' },
                    { model: db.HCondition, as: 'hba1c' },
                    { model: db.TsCondition, as: 'stressLevel' },
                    { model: db.ICondition, as: 'iCondition' }
                ]
            });
    
            if (!consultations.length) {
                return res.status(404).json({ message: 'No consultations found for this user' });
            }
    
            res.status(200).json(consultations);
        } catch (error) {
            console.error('Error fetching consultation history:', error.message || error);
            res.status(500).json({ message: 'Terjadi kesalahan internal', error: error.message });
        }
    }

    async getById(req, res) {
        try {
            // Extract consultation ID from request parameters and user ID from authenticated user
            const { id } = req.params;
            const userId = req.user.id;  // Assuming you are storing user ID in req.user after authentication
    
            // Find the Consultation by ID and user ID
            const consultation = await Consultation.findOne({
                where: {
                    id: id,
                    userId: userId
                },
                include: [
                    { model: ICondition },
                    { model: AfCondition },
                    { model: KgCondition },
                    { model: HCondition },
                    { model: TsCondition },
                    { model: Rule, include: [Result] }
                ]
            });
    
            if (!consultation) {
                return res.status(404).json({ error: 'Consultation not found for the given user.' });
            }
    
            // Extract the matched rule and result information
            const matchedRules = consultation.Rules;
            let highestCFResult = null;
    
            if (matchedRules.length > 0) {
                // Calculate the combined CF using the combining formula
                let combinedCF = 0;
                for (const rule of matchedRules) {
                    combinedCF = combinedCF + rule.cf * (1 - combinedCF);
                }
    
                // Get the Result based on the highest CF
                const highestCFRule = matchedRules.reduce((max, rule) => rule.cf > max.cf ? rule : max, { cf: -Infinity });
                highestCFResult = await Result.findOne({ where: { id: highestCFRule.result_id } });
            }
    
            // Get food recommendations based on the Result with the highest CF
            const foodRecommendations = highestCFResult ? 
                await FoodRecommendation.findAll({ where: { result_id: highestCFResult.id } }) : 
                [];
    
            // Send response with Consultation, Result, and recommendations
            res.json({ 
                Consultation: consultation, 
                Result: highestCFResult ? highestCFResult.name : null, 
                foodRecommendations: foodRecommendations 
            });
        } catch (error) {
            console.error('Error fetching Consultation:', error);
            res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
    }
    
        
}

module.exports = new ConsultationController();
