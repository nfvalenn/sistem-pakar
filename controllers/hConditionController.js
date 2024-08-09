const { HCondition } = require('../models');

// Membuat kondisi baru
exports.createHCondition = async (req, res) => {
  try {
    const { condition_code, category, description, cf } = req.body;
    const newCondition = await HCondition.create({ condition_code, category, description, cf });
    res.status(201).json(newCondition);
  } catch (error) {
    console.error('Error creating HCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan semua kondisi
exports.getAllHConditions = async (req, res) => {
  try {
    const conditions = await HCondition.findAll();
    res.status(200).json(conditions);
  } catch (error) {
    console.error('Error fetching HConditions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan kondisi berdasarkan ID
exports.getHConditionById = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await HCondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'HCondition not found' });
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error fetching HCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Memperbarui kondisi
exports.updateHCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const { condition_code, category, description, cf } = req.body;

    // Cari kondisi berdasarkan ID
    const condition = await HCondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'HCondition not found' });

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
    console.error('Error updating HCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Menghapus kondisi
exports.deleteHCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await HCondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'HCondition not found' });
    await condition.destroy();
    res.status(200).json({ message: 'HCondition deleted' });
  } catch (error) {
    console.error('Error deleting HCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
