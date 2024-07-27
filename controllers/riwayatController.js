const { Consultation } = require('../models');

// Mendapatkan riwayat konsultasi berdasarkan pengguna
exports.getConsultationHistoryByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const consultations = await Consultation.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(consultations);
  } catch (error) {
    console.error('Error fetching consultation history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
