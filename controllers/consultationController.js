const { consultation, user, icondition, afcondition, kgcondition, hcondition, tscondition, result, rules, foodRecomendation } = require('../models');

class ConsultationController {
    async create(req, res) {
        try {
            const { weight, height, age, gender, activityLevelId, bloodSugarId, hba1cId, stressLevelId, userId } = req.body;

            // Calculate IMT (BMI)
            const imt = weight / ((height / 100) ** 2);

            // Determine i_condition_id based on BMI
            let imtId;
            if (imt < 17) {
                imtId = 2;
            } else if (imt >= 17 && imt < 18.4) {
                imtId = 3;
            } else if (imt >= 18.5 && imt <= 25.0) {
                imtId = 4;
            } else if (imt >= 25.1 && imt <= 27.0) {
                imtId = 5;
            } else {
                imtId = 6;
            }

            // Validate existence of IMT condition
            const imtCondition = await icondition.findByPk(imtId);
            if (!imtCondition) {
                return res.status(404).json({ error: `IMT condition with id ${imtId} not found` });
            }

            // Validate existence of each other condition
            const [activityLevel, bloodSugar, hba1c, stressLevel] = await Promise.all([
                afcondition.findByPk(activityLevelId),
                kgcondition.findByPk(bloodSugarId),
                hcondition.findByPk(hba1cId),
                tscondition.findByPk(stressLevelId)
            ]);

            if (!activityLevel || !bloodSugar || !hba1c || !stressLevel) {
                return res.status(404).json({ error: 'One or more conditions not found' });
            }

            // Create a new consultation
            const newConsultation = await consultation.create({
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

            // Find the rules that match the conditions of the consultation
            const matchedRules = await rules.findAll({
                where: {
                    i_condition_id: imtId,
                    af_condition_id: activityLevelId,
                    kg_condition_id: bloodSugarId,
                    ts_condition_id: stressLevelId,
                    h_condition_id: hba1cId
                }
            });
            console.log('Found Rules:', matchedRules);

            if (matchedRules.length === 0) {
                return res.status(404).json({ error: 'No matching rules found for the given conditions' });
            }

            // Calculate the combined CF using the combining formula
            let combinedCF = 0;
            for (const rule of matchedRules) {
                combinedCF = combinedCF + rule.cf * (1 - combinedCF);
            }

            // Get the result based on the highest CF rules
            const resultId = matchedRules.reduce((max, rule) => rule.cf > max.cf ? rule : max, { cf: -Infinity }).result_id;
            const resultData = await result.findByPk(resultId);

            // Find the food recommendations based on result_id
            const recommendations = await foodRecomendation.findAll({
                where: { result_id: resultId }
            });

            res.status(201).json({
                consultation: newConsultation,
                combinedCF,
                result: resultData,
                foodRecommendations: recommendations
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ConsultationController();
