// utils/validators.js

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid, false otherwise
 */
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Validate if a string is not empty
 * @param {string} str - String to validate
 * @returns {boolean} True if not empty, false otherwise
 */
export const validateNonEmptyString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

/**
 * Validate if a number is within a specified range
 * @param {number} num - Number to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} True if within range, false otherwise
 */
export const validateNumberInRange = (num, min, max) => {
    return typeof num === 'number' && num >= min && num <= max;
};

/**
 * Validate an object against a schema
 * @param {Object} obj - Object to validate
 * @param {Object} schema - Schema defining required fields and types
 * @returns {boolean} True if valid, false otherwise
 */
export const validateObjectSchema = (obj, schema) => {
    return Object.keys(schema).every(key => {
        const type = schema[key];
        return typeof obj[key] === type;
    });
};
