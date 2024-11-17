// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

exports.registerUser  = async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User ({ username, password: hashedPassword, email });

    try {
        await newUser .save();
        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'User  registration failed' });
    }
};

exports.loginUser  = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ error: 'User  not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, keys.jwtSecret, { expiresIn: '1h' });
    res.json({ token });
};

exports.getUser Profile = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User  not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user profile' });
    }
};
