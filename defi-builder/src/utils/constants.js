// src/utils/constants.js

// API Endpoints
export const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL
export const AI_API_URL = `${API_BASE_URL}/ai`;
export const ANALYTICS_API_URL = `${API_BASE_URL}/analytics`;

// Token Constants
export const DEFAULT_TOKEN_DECIMALS = 18;
export const MAX_TOKEN_SUPPLY = 1_000_000_000; // Example maximum supply

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error, please try again later.',
    INVALID_INPUT: 'Invalid input, please check your values.',
    TOKEN_CREATION_FAILED: 'Failed to create token, please try again.',
};

// Other Constants
export const SUPPORTED_NETWORKS = {
    MAINNET: 1,
    ROPSTEN: 3,
    RINKEBY: 4,
    LOCAL: 5777,
};
