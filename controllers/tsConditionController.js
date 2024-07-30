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
// Mengambil tscondition berdasarkan ID
// Mendapatkan kondisi berdasarkan ID
exports.gettsconditionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (!id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    // Cari kondisi berdasarkan ID
    const condition = await tscondition.findByPk(id);

    // Cek apakah kondisi ditemukan
    if (!condition) {
      return res.status(404).json({ message: `tscondition with id ${id} not found` });
    }

    // Kirim respons dengan data kondisi
    res.status(200).json(condition);
  } catch (error) {
    // Tangani error dan kirim respons yang sesuai
    console.error('Error fetching tscondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Memperbarui tscondition
exports.updatetscondition = async (req, res) => {
  try {
    const { id } = req.params;
    const { condition_code, description, cf } = req.body;
    
    // Cari kondisi berdasarkan ID
    const condition = await tscondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'tscondition not found' });

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
    console.error('Error updating tscondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Menghapus tscondition
exports.deletetscondition = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Cari kondisi berdasarkan ID
    const condition = await tscondition.findByPk(id);
    if (!condition) return res.status(404).json({ message: 'tscondition not found' });

    // Hapus kondisi
    await condition.destroy();
    
    // Kirim respons dengan pesan sukses
    res.status(200).json({ message: 'tscondition deleted successfully' });
  } catch (error) {
    // Tangani error dan kirim respons yang sesuai
    console.error('Error deleting tscondition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

