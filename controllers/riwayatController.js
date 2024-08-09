const { Consultation } = require('../models');

// Mendapatkan riwayat konsultasi berdasarkan pengguna yang sedang login
exports.getConsultationHistoryByUser = async (req, res) => {
  try {
    const { id: userId } = req.user; // Gunakan userId dari token
    const consultations = await Consultation.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(consultations);
  } catch (error) {
    console.error('Error fetching consultation history:', error);
    res.status(500).json({ message: 'Terjadi kesalahan internal' });
  }
};
