// src/utils/helpers.js

/**
 * Format a number to a fixed decimal point.
 * @param {number} number - The number to format.
 * @param {number} decimals - The number of decimal points.
 * @returns {string} - The formatted number.
 */
export const formatNumber = (number, decimals = 2) => {
    return Number(number).toFixed(decimals);
};

/**
 * Convert a value from one unit to another.
 * @param {number} value - The value to convert.
 * @param {number} fromDecimals - The decimals of the original value.
 * @param {number} toDecimals - The decimals of the target value.
 * @returns {number} - The converted value.
 */
export const convertUnits = (value, fromDecimals, toDecimals) => {
    return (value * Math.pow(10, toDecimals - fromDecimals));
};

/**
 * Check if a string is a valid Ethereum address.
 * @param {string} address - The Ethereum address to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isValidEthereumAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Generate a random string of specified length.
 * @param {number} length - The length of the random string.
 * @returns {string} - The generated random string.
 */
export const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
