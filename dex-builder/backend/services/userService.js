// backend/services/userService.js
const User = require('../models/User');

const createUser = async (username, password) => {
    const newUser = new User({ username, password });
    return await newUser.save();
};

const findUserByUsername = async (username) => {
    return await User.findOne({ username });
};

module.exports = { createUser, findUserByUsername };
