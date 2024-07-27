const { tscondition } = require('../models');

// Membuat kondisi baru
exports.createtscondition = async (req, res) => {
  try {
    const { condition_code, category, description, cf } = req.body;
    const newCondition = await tscondition.create({ condition_code, category, description, cf });
    res.status(201).json(newCondition);
  } catch (error) {
    console.error('Error creating tscondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan semua kondisi
exports.getAlltsconditions = async (req, res) => {
  try {
    const conditions = await tscondition.findAll();
    res.status(200).json(conditions);
  } catch (error) {
    console.error('Error fetching tsconditions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan kondisi berdasarkan ID
exports.gettsconditionById = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await tscondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'tscondition not found' });
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error fetching tscondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Memperbarui kondisi
exports.updatetscondition = async (req, res) => {
  try {
    const { id } = req.params;
    const { condition_code, description, cf } = req.body;
    const condition = await tscondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'tscondition not found' });
    condition.condition_code = condition_code;
    condition.description = description;
    condition.cf = cf;
    await condition.save();
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error updating tscondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Menghapus kondisi
exports.deletetscondition = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await tscondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'tscondition not found' });
    await condition.destroy();
    res.status(200).json({ message: 'tscondition deleted' });
  } catch (error) {
    console.error('Error deleting tscondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
