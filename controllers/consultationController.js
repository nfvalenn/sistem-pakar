const { Consultation, User, AfCondition, KgCondition, HCondition, TsCondition, ICondition, Rule, Result, FoodRecommendation } = require('../models');

class ConsultationController {
    // Create a new consultation
    // Create a new consultation
    async create(req, res) {
        try {
            const { weight, height, age, gender, activityLevelId, bloodSugarId, hba1cId, stressLevelId } = req.body;
            const userId = req.user.id; // Get userId from authenticated user
    
            // Calculate IMT (BMI)
            const imt = weight / ((height / 100) ** 2);
            console.log('Calculated IMT:', imt);
    
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
            console.log('Determined IMT ID:', imtId);
    
            // Validate existence of IMT condition
            const imtCondition = await ICondition.findByPk(imtId);
            console.log('IMT Condition:', imtCondition);
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
            console.log('Conditions:', { activityLevel, bloodSugar, hba1c, stressLevel });
    
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
            console.log('New Consultation Created:', newConsultation);
    
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
            console.log('Matched Rules:', matchedRule);
    
            if (matchedRule.length === 0) {
                return res.status(404).json({ error: 'No matching Rule found for the given conditions' });
            }
    
            // Calculate the combined CF using the combining formula
            let combinedCF = 0;
            for (const rule of matchedRule) {
                combinedCF = combinedCF + rule.cf * (1 - combinedCF);
            }
            console.log('Combined CF:', combinedCF);
    
            // Get the Result based on the highest CF
            const highestCFRule = matchedRule.reduce((max, rule) => rule.cf > max.cf ? rule : max, { cf: -Infinity });
            const highestCFResult = await Result.findOne({ where: { id: highestCFRule.result_id } });
            console.log('Highest CF Result:', highestCFResult);
            if (!highestCFResult) {
                return res.status(404).json({ error: 'No Result found for the highest CF' });
            }
    
            // Get food recommendations based on the Result with the highest CF
            const recommendations = await FoodRecommendation.findAll({ where: { result_id: highestCFResult.id } });
            console.log('Food Recommendations:', recommendations);
    
            // Send response with Result and recommendations
            res.json({ 
                Result: highestCFResult.username, 
                foodRecommendations: recommendations,
                data: {
                    nama: req.user.username,
                    beratBadan: weight,
                    tinggiBadan: height,
                    umur: age,
                    jenisKelamin: gender,
                    statusAktivitasFisik: activityLevel.category,
                    kadarGulaDarah: bloodSugar.category,
                    hbA1c: hba1c.category,
                    tingkatStress: stressLevel.category,
                    BMI: imt.toFixed(2),
                    jumlahKalori: highestCFResult.calorie_range
                }
            });
        } catch (error) {
            console.error('Error creating Consultation:', error);
            res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
    }


    // Fetch consultation by ID
    async getById(req, res) {
        try {
            const consultationId = req.params.id;
            
            if (!consultationId) {
                return res.status(400).json({ error: 'ID parameter is required' });
            }
            
            // Fetch consultation details from the database
            const consultation = await Consultation.findByPk(consultationId, {
                include: [
                    { model: ICondition, as: 'iCondition' }, // iCondition (BMI)
                    { model: AfCondition, as: 'activityLevel' },
                    { model: KgCondition, as: 'bloodSugar' },
                    { model: HCondition, as: 'hba1c' },
                    { model: TsCondition, as: 'stressLevel' }
                ]
            });
    
            if (!consultation) {
                return res.status(404).json({ error: 'Consultation not found' });
            }
    
            // Find matching rule based on conditions
            const matchedRule = await Rule.findOne({
                where: {
                    i_condition_id: consultation.imtId,
                    af_condition_id: consultation.activityLevelId,
                    kg_condition_id: consultation.bloodSugarId,
                    ts_condition_id: consultation.stressLevelId,
                    h_condition_id: consultation.hba1cId
                }
            });
    
            if (!matchedRule) {
                return res.status(404).json({ error: 'No matching Rule found for the given conditions' });
            }
    
            // Get the result with the highest CF
            const highestCFResult = await Result.findOne({ where: { id: matchedRule.result_id } });
    
            if (!highestCFResult) {
                return res.status(404).json({ error: 'No Result found for the highest CF' });
            }
    
            // Fetch food recommendations based on the result_id
            const recommendations = await FoodRecommendation.findAll({ where: { result_id: highestCFResult.id } });
    
            if (!recommendations || recommendations.length === 0) {
                return res.status(404).json({ error: 'No food recommendations found' });
            }
    
            // Assuming you have authentication middleware that attaches the user object to req
            const currentUser = req.user; // This is where the current logged-in user's data is usually found
    
            // Construct the response
            res.json({ 
                consultation,
                result: highestCFResult.username, // Assuming 'username' is part of the Result model
                foodRecommendations: recommendations.map(item => ({
                    name: item.name,
                    calories: item.calories,
                    protein: item.protein,
                    fat: item.fat,
                    weight: item.weight,
                    porsi: item.porsi,
                    time: item.time
                })),
                data: {
                    beratBadan: consultation.weight,
                    tinggiBadan: consultation.height,
                    umur: consultation.age,
                    jenisKelamin: consultation.gender,
                    statusAktivitasFisik: consultation.activityLevel.category,
                    kadarGulaDarah: consultation.bloodSugar.category,
                    hbA1c: consultation.hba1c.category,
                    tingkatStress: consultation.stressLevel.category,
                    BMI: consultation.imt.toFixed(2),
                    jumlahKalori: consultation.calorie_range // Assuming Result model contains calorieRequirement
                },
                username: currentUser ? currentUser.username : 'Unknown User' // Adding the active user's username
            });
        } catch (error) {
            console.error('Error fetching Consultation details:', error);
            res.status(500).json({ error: 'An error occurred while processing your request. Please check the server logs for details.' });
        }
    }
    
    
    

    // Fetch consultation history by user
    async getConsultationHistoryByUser(req, res) {
        try {
            const userId = req.user.id; // Get userId from authenticated user
    
            const consultations = await Consultation.findAll({
                where: { userId },
                order: [['createdAt', 'DESC']],
                include: [
                    { model: AfCondition, as: 'activityLevel' },
                    { model: KgCondition, as: 'bloodSugar' },
                    { model: HCondition, as: 'hba1c' },
                    { model: TsCondition, as: 'stressLevel' },
                    { model: ICondition, as: 'iCondition' }
                ]
            });
    
            if (!consultations.length) {
                return res.status(404).json({ message: 'No consultations found for this user' });
            }
    
            res.status(200).json(consultations);
        } catch (error) {
            console.error('Error fetching consultation history:', error.message || error);
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    }

    // Fetch all consultations
    async getAll(req, res) {
        try {
            // Get userId from query parameters
            const { userId } = req.query;
    
            // Fetch consultations based on userId, if provided
            const whereCondition = userId ? { userId } : {}; // Filter by userId if present
    
            // Fetch consultations including associated User and conditions
            const consultations = await Consultation.findAndCountAll({
                where: whereCondition, // Apply the userId filter
                include: [
                    { model: User, as: 'user' },
                    { model: AfCondition, as: 'activityLevel' },
                    { model: KgCondition, as: 'bloodSugar' },
                    { model: HCondition, as: 'hba1c' },
                    { model: TsCondition, as: 'stressLevel' },
                    { model: ICondition, as: 'iCondition' }
                ]
            });
    
            res.json(consultations);
        } catch (error) {
            console.error('Detailed Error:', error.message);
            res.status(500).json({ error: 'An error occurred while fetching consultations.', details: error.message });
        }
    }
    
}

module.exports = new ConsultationController();
