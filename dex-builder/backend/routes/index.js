// backend/routes/index.js
const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const tradeRoutes = require('./tradeRoutes');

router.use('/users', userRoutes);
router.use('/trades', tradeRoutes);

module.exports = router;
