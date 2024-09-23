import { W } from './Util.types';
import { debug } from './Debug';

/**
 * A constant string used as the cache key in the window object.
 */
const CACHE_KEY: string = 'hnsCache';

/**
 * Returns the cache object stored in the window object.
 * Creates an empty object in the window object if one does not exist.
 *
 * @returns {unknown object} The cache object.
 */
function getCache(): any {
  if (!W[CACHE_KEY]) W[CACHE_KEY] = {};
  return W[CACHE_KEY];
}

/**
 * Checks if a given key exists in the cache object.
 *
 * @param {string} key The key to check in the cache object.
 *
 * @returns {boolean | unknown object} The value of the key if it exists in the cache, false otherwise.
 */
function isCached(key: string): boolean | any {
  const cache = getCache();
  if (!cache) return false;

  if (cache[key] === undefined) {
    return false;
  }

  //Helps debug how much it is called
  let count = cache[key + '_count'];
  count = count ? (count as number) + 1 : 1;
  cache[key + '_count'] = count;

  return cache[key];
}

function cache(key: string): boolean | any {
  const cache = getCache();
  if (!cache) return false;

  return cache[key];
}

/**
 * Clears a given key from the cache object.
 *
 * @param {string} key The key to clear from the cache object.
 *
 * @returns {boolean} True if the key was successfully cleared from the cache, false otherwise.
 */
function clearCache(key?: string): boolean {
  const cache = getCache();

  if (!cache) return false;
  if (!key) {
    W[CACHE_KEY] = {};
    return true;
  }
  if (cache[key]) {
    const old = {...cache}
    delete cache[key];
    cache[key] = undefined;
    debug("ClearCache triggered", {key, old, new:{...cache}})

    return true;
  }
  return false;
}

/**
 * Sets a value for a given key in the cache object.
 *
 * @param {string} key The key to set in the cache object.
 * @param {any} value The value to set for the key in the cache object.
 *
 * @returns {void}
 */
function setCache(key: string, value: any): void {
  W[CACHE_KEY][key] = value;
}

export { isCached, clearCache, setCache, getCache, cache };
