const db = require('../models');
const Article = db.article;


const createArticle = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    // Log untuk debugging
    console.log('Request Body:', req.body);
    console.log('File:', req.file);

    // Validasi input
    if (!title || !content || !authorId) {
      return res.status(400).json({ message: "Title, content, and authorId cannot be null" });
    }

    const newArticle = await Article.create({ title, content, authorId, imageUrl });
    res.status(201).json(newArticle);
  } catch (error) {
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
    const imageUrl = req.file ? req.file.path : null;
    const updatedArticle = await Article.update(
      { title, content, authorId, imageUrl },
      { where: { id: req.params.id } }
    );
    if (updatedArticle[0] === 1) {
      res.status(200).json({ message: "Article updated successfully" });
    } else {
      res.status(404).json({ message: "Article not found" });
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
