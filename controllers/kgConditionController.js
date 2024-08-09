const { KgCondition } = require('../models');

// Membuat kg-condition baru
exports.createKgCondition = async (req, res) => {
  try {
    const { condition_code, category, description, cf } = req.body;
    const newCondition = await KgCondition.create({ condition_code, category, description, cf });
    res.status(201).json(newCondition);
  } catch (error) {
    console.error('Error creating KgCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan semua kg-condition
exports.getAllKgConditions = async (req, res) => {
  try {
    const conditions = await KgCondition.findAll();
    res.status(200).json(conditions);
  } catch (error) {
    console.error('Error fetching KgConditions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan kg-condition berdasarkan ID
exports.getKgConditionById = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await KgCondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'Condition not found' });
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error fetching KgCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Memperbarui kg-condition
exports.updateKgCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const { condition_code, category, description, cf } = req.body;

    // Cari kondisi berdasarkan ID
    const condition = await KgCondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'Condition not found' });

    // Perbarui hanya field yang ada di req.body
    if (condition_code !== undefined) condition.condition_code = condition_code;
    if (category !== undefined) condition.category = category;
    if (description !== undefined) condition.description = description;
    if (cf !== undefined) condition.cf = cf;

    // Simpan perubahan
    await condition.save();

    // Kirim respons dengan data kondisi yang diperbarui
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error updating KgCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Menghapus kg-condition
exports.deleteKgCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await KgCondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'Condition not found' });

    await condition.destroy();
    res.status(204).json({ message: 'kadar gula darah berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting KgCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
