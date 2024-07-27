const { icondition } = require('../models');

// Membuat kondisi baru
exports.createicondition = async (req, res) => {
  try {
    const { condition_code, description, cf } = req.body;
    const newCondition = await icondition.create({ condition_code, description, cf });
    res.status(201).json(newCondition);
  } catch (error) {
    console.error('Error creating icondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan semua kondisi
exports.getAlliconditions = async (req, res) => {
  try {
    const conditions = await icondition.findAll();
    res.status(200).json(conditions);
  } catch (error) {
    console.error('Error fetching iconditions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan kondisi berdasarkan ID
exports.geticonditionById = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await icondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'icondition not found' });
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error fetching icondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Memperbarui kondisi
exports.updateicondition = async (req, res) => {
  try {
    const { id } = req.params;
    const { condition_code, description, cf } = req.body;
    const condition = await icondition.findByPk(id);

    if (!condition) return res.status(404).json({ message: 'icondition not found' });

    if (condition_code !== undefined) {
      condition.condition_code = condition_code;
    }
    if (description !== undefined) {
      condition.description = description;
    }
    if (cf !== undefined) {
      condition.cf = cf;
    }

    await condition.save();
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error updating icondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Menghapus kondisi
exports.deleteicondition = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await icondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'icondition not found' });
    await condition.destroy();
    res.status(200).json({ message: 'icondition deleted' });
  } catch (error) {
    console.error('Error deleting icondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
