const { TsCondition } = require('../models');

// Membuat kondisi baru
exports.createTsCondition = async (req, res) => {
  try {
    const { condition_code, category, description, cf } = req.body;
    const newCondition = await TsCondition.create({ condition_code, category, description, cf });
    res.status(201).json(newCondition);
  } catch (error) {
    console.error('Error creating TsCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan semua kondisi
exports.getAllTsConditions = async (req, res) => {
  try {
    const conditions = await TsCondition.findAll();
    res.status(200).json(conditions);
  } catch (error) {
    console.error('Error fetching TsConditions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan kondisi berdasarkan ID
// Mengambil TsCondition berdasarkan ID
// Mendapatkan kondisi berdasarkan ID
exports.getTsConditionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (!id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    // Cari kondisi berdasarkan ID
    const condition = await TsCondition.findByPk(id);

    // Cek apakah kondisi ditemukan
    if (!condition) {
      return res.status(404).json({ message: `TsCondition with id ${id} not found` });
    }

    // Kirim respons dengan data kondisi
    res.status(200).json(condition);
  } catch (error) {
    // Tangani error dan kirim respons yang sesuai
    console.error('Error fetching TsCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Memperbarui TsCondition
exports.updateTsCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const { condition_code, description, cf } = req.body;
    
    // Cari kondisi berdasarkan ID
    const condition = await TsCondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'TsCondition not found' });

    // Hanya memperbarui field yang ada di req.body
    if (condition_code !== undefined) condition.condition_code = condition_code;
    if (description !== undefined) condition.description = description;
    if (cf !== undefined) condition.cf = cf;

    // Simpan perubahan
    await condition.save();

    // Kirim respons dengan data kondisi yang diperbarui
    res.status(200).json(condition);
  } catch (error) {
    // Tangani error dan kirim respons yang sesuai
    console.error('Error updating TsCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Menghapus TsCondition
exports.deleteTsCondition = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Cari kondisi berdasarkan ID
    const condition = await TsCondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'TsCondition not found' });

    // Hapus kondisi
    await condition.destroy();
    
    // Kirim respons dengan pesan sukses
    res.status(200).json({ message: 'TsCondition deleted successfully' });
  } catch (error) {
    // Tangani error dan kirim respons yang sesuai
    console.error('Error deleting TsCondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

