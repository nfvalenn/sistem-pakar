const { AfCondition } = require('../models');

// Membuat kondisi baru
exports.createAfCondition = async (req, res) => {
  try {
    const { condition_code, category, description, cf } = req.body;
    const newCondition = await AfCondition.create({ condition_code, category, description, cf });
    res.status(201).json(newCondition);
  } catch (error) {
    console.error('Error creating AfCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan semua kondisi
exports.getAllAfConditions = async (req, res) => {
  try {
    const conditions = await AfCondition.findAll();
    res.status(200).json(conditions);
  } catch (error) {
    console.error('Error fetching AfConditions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan kondisi berdasarkan ID
exports.getAfConditionById = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await AfCondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'AfCondition not found' });
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error fetching AfCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Memperbarui kondisi
exports.updateAfCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const { condition_code, description, cf } = req.body;

    // Temukan entri AfCondition berdasarkan ID
    const condition = await AfCondition.findByPk(id);
    if (!condition) {
      return res.status(404).json({ message: 'AfCondition not found' });
    }

    // Hanya perbarui kolom yang ada di req.body
    if (condition_code !== undefined) {
      condition.condition_code = condition_code;
    }
    if (description !== undefined) {
      condition.description = description;
    }
    if (cf !== undefined) {
      condition.cf = cf;
    }

    // Simpan perubahan
    await condition.save();
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error updating AfCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Menghapus kondisi
exports.deleteAfCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await AfCondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'AfCondition not found' });
    await condition.destroy();
    res.status(200).json({ message: 'AfCondition deleted' });
  } catch (error) {
    console.error('Error deleting AfCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
