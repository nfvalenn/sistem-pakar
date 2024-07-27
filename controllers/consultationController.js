const { consultation, rules } = require("../models");

// Fungsi untuk menghitung CF
function calculateCF(rules, consultation) {
  let cf = 0;
  
  // Contoh perhitungan CF; sesuaikan dengan logika spesifik Anda
  if (rules.i_condition_id && consultation.activityLevelId === rules.i_condition_id) {
    cf += rules.cf;
  }
  if (rules.af_condition_id && consultation.bloodSugarId === rules.af_condition_id) {
    cf += rules.cf;
  }
  if (rules.kg_condition_id && consultation.hba1cId === rules.kg_condition_id) {
    cf += rules.cf;
  }
  if (rules.ts_condition_id && consultation.stressLevelId === rules.ts_condition_id) {
    cf += rules.cf;
  }
  if (rules.h_condition_id && consultation.healthConditionId === rules.h_condition_id) {
    cf += rules.cf;
  }
  
  return Math.min(cf, 1); // CF tidak boleh lebih dari 1
}

// Fungsi untuk membuat konsultasi baru
exports.createconsultation = async (req, res) => {
  try {
    const { weight, height, age, gender, activityLevelId, bloodSugarId, hba1cId, stressLevelId } = req.body;

    // Validasi input
    if (!weight || !height) {
      return res.status(400).json({ message: 'Weight and height are required to calculate BMI' });
    }

    // Hitung BMI
    const bmi = calculateBMI(weight, height);

    // Buat konsultasi baru
    const Consultation = await consultation.create({
      weight,
      height,
      age,
      gender,
      activityLevelId,
      bloodSugarId,
      hba1cId,
      stressLevelId,
      bmi
    });

    // Ambil data aturan dari tabel ruless
    const ruless = await rules.findAll();

    // Hitung dan simpan CF untuk setiap aturan
    let maxCF = 0;
    for (const rules of ruless) {
      const cf = calculateCF(rules, consultation);
      if (cf > maxCF) maxCF = cf; // Simpan CF maksimum atau sesuai logika Anda
    }

    // Update konsultasi dengan CF maksimum
    await consultation.update({ maxCF });

    res.status(201).json(Consultation);
  } catch (error) {
    console.error('Error creating consultation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Menghitung BMI
function calculateBMI(weight, height) {
  if (height <= 0) return 0; // Mencegah pembagian dengan nol
  return weight / (height * height);
}
