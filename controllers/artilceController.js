const db = require('../models');
const Article = db.Article;
const User = db.User;

const createArticle = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Log untuk debugging
    console.log('Request Body:', req.body);
    console.log('File:', req.file);

    // Validasi input
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content cannot be null" });
    }

    // Dapatkan ID admin default jika authorId tidak disediakan
    let adminId = authorId;
    if (!authorId) {
      const admin = await User.findOne({ where: { role: 'admin' } });
      if (!admin) {
        return res.status(500).json({ message: "Admin user not found" });
      }
      adminId = admin.id;
    }

    const newArticle = await Article.create({ title, content, authorId: adminId, imageUrl });
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);  // Log untuk debugging
    res.status(500).json({ message: error.message });
  }
};



const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Adjust path as needed
    const [updated] = await Article.update(
      { title, content, authorId, imageUrl },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedArticle = await Article.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedArticle);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(200).json({ message: "Article deleted successfully" });
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
};
