const { result } = require('../models');

// Menambahkan hasil baru
exports.createResult = async (req, res) => {
    try {
      const { code, category, calorie_range, description } = req.body;
  
      const newResult = await result.create({
        code,
        category,
        calorie_range,
        description
      });
  
      res.status(201).json(newResult);
    } catch (error) {
      console.error('Error creating result:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// Memperbarui hasil yang ada
exports.updateresult = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, category, calorie_range, description } = req.body;

    // Mencari hasil berdasarkan ID
    const result = await result.findByPk(id);
    if (!result) {
      return res.status(404).json({ message: 'result not found' });
    }

    // Memperbarui data hasil
    result.code = code;
    result.category = category;
    result.calorie_range = calorie_range;
    result.description = description;
    await result.save();

    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating result:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan semua hasil
exports.getAllresults = async (req, res) => {
  try {
    const results = await result.findAll();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mendapatkan hasil berdasarkan ID
exports.getresultById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await result.findByPk(id);
    if (!result) return res.status(404).json({ message: 'result not found' });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching result:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Menghapus hasil berdasarkan ID
exports.deleteresult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await result.findByPk(id);
    if (!result) return res.status(404).json({ message: 'result not found' });
    await result.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting result:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
