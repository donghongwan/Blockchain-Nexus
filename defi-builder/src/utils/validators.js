// src/utils/validators.js

import { ERROR_MESSAGES } from './constants';

/**
 * Validate if a number is within a specified range.
 * @param {number} value - The number to validate.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {string|null} - An error message if invalid, null if valid.
 */
export const validateNumberRange = (value, min, max) => {
    if (typeof value !== 'number' || isNaN(value)) {
        return ERROR_MESSAGES.INVALID_INPUT;
    }
    if (value < min || value > max) {
        return `Value must be between ${min} and ${max}.`;
    }
    return null;
};

/**
 * Validate if a string is not empty.
 * @param {string} value - The string to validate.
 * @returns {string|null} - An error message if invalid, null if valid.
 */
export const validateNonEmptyString = (value) => {
    if (typeof value !== 'string' || value.trim() === '') {
        return ERROR_MESSAGES.INVALID_INPUT;
    }
    return null;
};

/**
 * Validate if a token symbol is valid (e.g., 3-5 uppercase letters).
 * @param {string} symbol - The token symbol to validate.
 * @returns {string|null} - An error message if invalid, null if valid.
 */
export const validateTokenSymbol = (symbol) => {
    const regex = /^[A-Z]{3,5}$/;
    if (!regex.test(symbol)) {
        return 'Token symbol must be 3 to 5 uppercase letters.';
    }
    return null;
};

/**
 * Validate if a total supply is a positive integer.
 * @param {number} totalSupply - The total supply to validate.
 * @returns {string|null} - An error message if invalid, null if valid.
 */
export const validateTotalSupply = (totalSupply) => {
    if (!Number.isInteger(totalSupply) || totalSupply <= 0) {
        return 'Total supply must be a positive integer.';
    }
    return null;
};

/**
 * Validate if an input is a valid email address.
 * @param {string} email - The email address to validate.
 * @returns {string|null} - An error message if invalid, null if valid.
 */
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return 'Invalid email address.';
    }
    return null;
};
