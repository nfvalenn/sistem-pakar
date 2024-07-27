const { Consultation, Rule, ConsultationRule } = require('../models');

exports.createConsultation = async (req, res) => {
  try {
    const { userId, conditions } = req.body; // Data penderita

    if (!userId || !conditions) {
      return res.status(400).json({ message: 'UserId and conditions are required' });
    }

    // Buat entri konsultasi baru
    const consultation = await Consultation.create({ userId });

    // Temukan rule yang cocok
    const rules = await Rule.findAll({
      where: {
        i_condition_id: conditions.i_condition_id,
        af_condition_id: conditions.af_condition_id,
        kg_condition_id: conditions.kg_condition_id,
        ts_condition_id: conditions.ts_condition_id,
        h_condition_id: conditions.h_condition_id
      }
    });

    // Tambahkan rule ke konsultasi
    await consultation.addRules(rules);

    // Hitung total CF
    let totalCF = 0;
    rules.forEach(rule => {
      totalCF += rule.cf;
    });

    // Rekomendasi makanan
    const recommendations = getRecommendationsBasedOnCF(totalCF);

    res.status(201).json({
      consultation,
      totalCF,
      recommendations
    });
  } catch (error) {
    console.error('Error creating consultation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

function getRecommendationsBasedOnCF(cf) {
  if (cf > 0.8) {
    return ['Makanan A', 'Makanan B'];
  } else if (cf > 0.6) {
    return ['Makanan C', 'Makanan D'];
  } else {
    return ['Makanan E', 'Makanan F'];
  }
}
