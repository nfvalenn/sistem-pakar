const { afcondition } = require('../models');

// Membuat kondisi baru
exports.createafcondition = async (req, res) => {
  try {
    const { condition_code, category, description, cf } = req.body;
    const newCondition = await afcondition.create({ condition_code, category, description, cf });
    res.status(201).json(newCondition);
  } catch (error) {
    console.error('Error creating afcondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan semua kondisi
exports.getAllafconditions = async (req, res) => {
  try {
    const conditions = await afcondition.findAll();
    res.status(200).json(conditions);
  } catch (error) {
    console.error('Error fetching afconditions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan kondisi berdasarkan ID
exports.getafconditionById = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await afcondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'afcondition not found' });
    res.status(200).json(condition);
  } catch (error) {
    console.error('Error fetching afcondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Memperbarui kondisi
exports.updateafcondition = async (req, res) => {
  try {
    const { id } = req.params;
    const { condition_code, description, cf } = req.body;

    // Temukan entri afcondition berdasarkan ID
    const condition = await afcondition.findByPk(id);
    if (!condition) {
      return res.status(404).json({ message: 'afcondition not found' });
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
    console.error('Error updating afcondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Menghapus kondisi
exports.deleteafcondition = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await afcondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'afcondition not found' });
    await condition.destroy();
    res.status(200).json({ message: 'afcondition deleted' });
  } catch (error) {
    console.error('Error deleting afcondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
