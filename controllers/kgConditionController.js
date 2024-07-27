const { kgcondition } = require('../models');

// Membuat kg-condition baru
exports.createkgcondition = async (req, res) => {
  try {
    const { condition_code, category, description, cf } = req.body;
    const newCondition = await kgcondition.create({ condition_code, category, description, cf });
    res.status(201).json(newCondition);
  } catch (error) {
    console.error('Error creating kgcondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan semua kg-condition
exports.getAllkgconditions = async (req, res) => {
  try {
    const conditions = await kgcondition.findAll();
    res.status(200).json(conditions);
  } catch (error) {
    console.error('Error fetching kgconditions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan kg-condition berdasarkan ID
exports.getkgconditionById = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await kgcondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'Condition not found' });
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error fetching kgcondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Memperbarui kg-condition
exports.updatekgcondition = async (req, res) => {
  try {
    const { id } = req.params;
    const { condition_code, description, cf } = req.body;
    const condition = await kgcondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'Condition not found' });

    condition.condition_code = condition_code;
    condition.description = description;
    condition.cf = cf;
    await condition.save();

    res.status(200).json(condition);
  } catch (error) {
    console.error('Error updating kgcondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Menghapus kg-condition
exports.deletekgcondition = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await kgcondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'Condition not found' });

    await condition.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting kgcondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};