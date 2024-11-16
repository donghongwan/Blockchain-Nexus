// src/identity/utils.js

const { ethers } = require('ethers');

function generateUniqueId(email) {
    return ethers.utils.id(email);
}

module.exports = { generateUniqueId };
