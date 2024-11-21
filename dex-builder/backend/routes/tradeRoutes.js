// backend/routes/tradeRoutes.js
const express = require('express');
const { createTrade, getTrades } = require('../controllers/tradeController');
const router = express.Router();

router.post('/', createTrade);
router.get('/', getTrades);

module.exports = router;
