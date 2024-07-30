const { hcondition } = require('../models');

// Membuat kondisi baru
exports.createhcondition = async (req, res) => {
  try {
    const { condition_code, category, description, cf } = req.body;
    const newCondition = await hcondition.create({ condition_code, category, description, cf });
    res.status(201).json(newCondition);
  } catch (error) {
    console.error('Error creating hcondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan semua kondisi
exports.getAllhconditions = async (req, res) => {
  try {
    const conditions = await hcondition.findAll();
    res.status(200).json(conditions);
  } catch (error) {
    console.error('Error fetching hconditions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan kondisi berdasarkan ID
exports.gethconditionById = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await hcondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'hcondition not found' });
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error fetching hcondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Memperbarui kondisi
exports.updatehcondition = async (req, res) => {
  try {
    const { id } = req.params;
    const { condition_code, category, description, cf } = req.body;

    // Cari kondisi berdasarkan ID
    const condition = await hcondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'hcondition not found' });

    // Hanya memperbarui field yang ada di req.body
    if (condition_code !== undefined) condition.condition_code = condition_code;
    if (category !== undefined) condition.category = category;
    if (description !== undefined) condition.description = description;
    if (cf !== undefined) condition.cf = cf;

    // Simpan perubahan
    await condition.save();

    // Kirim respons dengan data kondisi yang diperbarui
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error updating hcondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Menghapus kondisi
exports.deletehcondition = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await hcondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'hcondition not found' });
    await condition.destroy();
    res.status(200).json({ message: 'hcondition deleted' });
  } catch (error) {
    console.error('Error deleting hcondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
