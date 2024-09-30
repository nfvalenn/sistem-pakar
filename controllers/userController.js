const db = require('../models');
const bcrypt = require('bcryptjs');


const getUserCount = async (req, res) => {
  try {
    // Fetch the count of users
    const { count } = await db.User.findAndCountAll();
    // Respond with the count
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fungsi untuk mendapatkan profil pengguna berdasarkan ID
const getProfileById = async (req, res) => {
  try {
    const { id } = req.user; // Gunakan id dari pengguna yang terautentikasi
    const user = await db.User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fungsi untuk memperbarui profil pengguna
const updateProfile = async (req, res) => {
  try {
    const { id } = req.user; // Gunakan id dari pengguna yang terautentikasi
    const { username, email, password } = req.body;
    const user = await db.User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username || user.username;
    user.email = email || user.email;
    if (password) user.password = await bcrypt.hash(password, 10); // Enkripsi password

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fungsi untuk mendapatkan semua pengguna
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users and count them
    const result = await db.User.findAndCountAll();
    const users = result.rows; 
    console.log(result);// This contains the user data
    const count = result.count; // This contains the total count

    // Send both the user data and count in the response
    res.status(200).json({ users, count });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Fungsi untuk mendapatkan pengguna berdasarkan ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fungsi untuk memperbarui pengguna berdasarkan ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = await db.User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username || user.username;
    user.email = email || user.email;
    if (password) user.password = await bcrypt.hash(password, 10); // Enkripsi password

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fungsi untuk menghapus pengguna berdasarkan ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fungsi untuk membuat pengguna baru
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validasi input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Cek jika email sudah digunakan
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email is already in use' });

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const newUser = await db.User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProfileById, updateProfile, getAllUsers, getUserById, updateUser, deleteUser, createUser, getUserCount };
