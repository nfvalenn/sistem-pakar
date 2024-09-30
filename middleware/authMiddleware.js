const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Adjust the path as necessary

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        
        // Find user by id and attach to request object
        req.user = await User.findByPk(user.id);
        if (!req.user) return res.sendStatus(404);

        next();
    });
};

module.exports = authenticateToken;
