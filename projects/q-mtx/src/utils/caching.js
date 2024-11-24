// utils/caching.js

const cache = new Map();

/**
 * Set a value in the cache
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} ttl - Time to live in milliseconds
 */
export const setCache = (key, value, ttl) => {
    const expirationTime = Date.now() + ttl;
    cache.set(key, { value, expirationTime });
};

/**
 * Get a value from the cache
 * @param {string} key - Cache key
 * @returns {any|null} Cached value or null if not found or expired
 */
export const getCache = (key) => {
    const cachedItem = cache.get(key);
    if (!cachedItem) return null;

    if (Date.now() > cachedItem.expirationTime) {
        cache.delete(key); // Remove expired item
        return null;
    }

    returncachedItem.value;
};

/**
 * Clear the cache
 */
export const clearCache = () => {
    cache.clear();
};

/**
 * Remove a specific key from the cache
 * @param {string} key - Cache key to remove
 */
export const removeCacheKey = (key) => {
    cache.delete(key);
};
