const jwt = require('jsonwebtoken');
const db = require('../models');

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await db.User.findByPk(decoded.id); // Tambahkan data pengguna ke objek request
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'Access forbidden' });
    }
  };
};

module.exports = { authenticateToken, authorizeRole };
