// utils/helpers.js

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export const generateUniqueId = () => {
    return `id_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format a date to a readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * Log error messages
 * @param {string} message - Error message
 */
export const logError = (message) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
};
