/**
 * Returns the cache object stored in the window object.
 * Creates an empty object in the window object if one does not exist.
 *
 * @returns {unknown object} The cache object.
 */
declare function getCache(): any;
/**
 * Checks if a given key exists in the cache object.
 *
 * @param {string} key The key to check in the cache object.
 *
 * @returns {boolean | unknown object} The value of the key if it exists in the cache, false otherwise.
 */
declare function isCached(key: string): boolean | any;
declare function cache(key: string): boolean | any;
/**
 * Clears a given key from the cache object.
 *
 * @param {string} key The key to clear from the cache object.
 *
 * @returns {boolean} True if the key was successfully cleared from the cache, false otherwise.
 */
declare function clearCache(key?: string): boolean;
/**
 * Sets a value for a given key in the cache object.
 *
 * @param {string} key The key to set in the cache object.
 * @param {any} value The value to set for the key in the cache object.
 *
 * @returns {void}
 */
declare function setCache(key: string, value: any): void;
export { isCached, clearCache, setCache, getCache, cache };
//# sourceMappingURL=Cache.d.ts.map