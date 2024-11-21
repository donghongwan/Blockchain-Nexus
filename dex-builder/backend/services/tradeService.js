// backend/services/tradeService.js
const Trade = require('../models/Trade');

const createTrade = async (tradeData) => {
    const newTrade = new Trade(tradeData);
    return await newTrade.save();
};

const getAllTrades = async () => {
    return await Trade.find();
};

module.exports = { createTrade, getAllTrades };
