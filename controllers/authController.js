const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Adjust the path as necessary

// Register a new user
const register = async (req, res) => {
    const { username, email, password } = req.body;

    // Validate that username, email, and password are provided
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with username, email, and hashed password
        await User.create({ username, email, password: hashedPassword });

        // Respond with a success message
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Registration failed' });
    }
};


// Login a user and generate a JWT
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate that email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token and include the user role in the payload
        const token = jwt.sign(
            { id: user.id, role: user.role }, // Include role in the token
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with the token and user role
        return res.json({ token, role: user.role });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'An error occurred during login' });
    }
};

// Logout a user (clear token on the client side)
const logout = (req, res) => {
    try {
        // Clear the token cookie (assuming you're using cookies for token storage)
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

module.exports = { register, login, logout };
