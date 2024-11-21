// backend/controllers/userController.js
const User = require('../models/User');

const registerUser  = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser  = new User({ username, password });
        await newUser .save();
        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

const loginUser  = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'User  logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' });
    }
};

module.exports = { registerUser , loginUser  };
