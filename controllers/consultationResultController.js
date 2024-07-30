// const { consultation, rules, consultationrules } = require('../models');

// // Membuat konsultasi baru
// exports.createConsultation = async (req, res) => {
//   try {
//     const { weight, height, age, gender, activityLevel, bloodSugar, hba1c, stressLevel } = req.body;

//     // Validasi input
//     if (weight == null || height == null) {
//       return res.status(400).json({ message: 'Weight and height are required to calculate BMI' });
//     }

//     // Hitung BMI
//     const bmi = calculateBMI(weight, height);

//     // Buat konsultasi baru
//     const consultation = await consultation.create({
//       weight,
//       height,
//       age,
//       gender,
//       activityLevel,
//       bloodSugar,
//       hba1c,
//       stressLevel,
//       bmi
//     });

//     // Hitung CF (Contoh perhitungan CF di sini; sesuaikan dengan logika Anda)
//     const ruless = await rules.findAll();
//     for (const rules of ruless) {
//       // Logika perhitungan CF berdasarkan rules dan data konsultasi
//       const cf = calculateCF(rules, consultation); // Implementasikan perhitungan CF Anda
//       await consultationrules.create({
//         consultationId: consultation.id,
//         rulesId: rules.id,
//         cf
//       });
//     }

//     res.status(201).json(consultation);
//   } catch (error) {
//     console.error('Error creating consultation:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Mendapatkan semua konsultasi
// exports.getAllConsultations = async (req, res) => {
//   try {
//     const consultations = await consultation.findAll();
//     res.status(200).json(consultations);
//   } catch (error) {
//     console.error('Error fetching consultations:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Mendapatkan konsultasi berdasarkan ID
// exports.getConsultationById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const consultation = await consultation.findByPk(id);
//     if (!consultation) return res.status(404).json({ message: 'consultation not found' });
//     res.status(200).json(consultation);
//   } catch (error) {
//     console.error('Error fetching consultation:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Menghitung BMI
// function calculateBMI(weight, height) {
//   if (height <= 0) return 0; // Mencegah pembagian dengan nol
//   return weight / (height * height);
// }

// // Menghitung CF
// function calculateCF(rules, consultation) {
//   // Implementasikan logika perhitungan CF sesuai kebutuhan
//   // Ini adalah contoh sederhana; sesuaikan dengan logika spesifik Anda
//   let cf = 0;

//   // Contoh perhitungan CF; Anda harus menyesuaikan dengan aturan dan data Anda
//   if (rules.i_condition_id) cf += (consultation.bloodSugar > 150 ? rules.cf : 0);
//   if (rules.af_condition_id) cf += (consultation.age > 50 ? rules.cf : 0);
//   if (rules.kg_condition_id) cf += (consultation.bmi > 25 ? rules.cf : 0);
//   if (rules.ts_condition_id) cf += (consultation.stressLevel > 5 ? rules.cf : 0);
//   if (rules.h_condition_id) cf += (consultation.hba1c > 7 ? rules.cf : 0);

//   return Math.min(cf, 1); // CF tidak boleh lebih dari 1
// }
