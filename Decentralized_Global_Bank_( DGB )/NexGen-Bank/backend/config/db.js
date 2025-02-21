// config/db.js
const mongoose = require('mongoose');
const keys = require('./keys');

const connectDB = async () => {
    try {
        await mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
