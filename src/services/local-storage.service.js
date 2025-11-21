import { CLIENT_ERROR_MESSAGE } from '../utils/constants.js';

class LocalStorageService {
  /** @type {string} */
  #namespace;

  /** @param {string} namespace */
  constructor(namespace) {
    if (!namespace || typeof namespace !== 'string') {
      throw new Error(CLIENT_ERROR_MESSAGE.STORAGE_NAMESPACE_INVALID);
    }
    this.#namespace = `${namespace}:`;
  }

  /**
   * @param {string} key
   * @param {unknown} value
   */
  set(key, value) {
    const fullKey = `${this.#namespace}${key}`;
    localStorage.setItem(fullKey, this.#valueToStore(value));
  }

  /**
   * @param {string} key
   * @returns {unknown | null}
   */
  get(key) {
    const fullKey = `${this.#namespace}${key}`;
    const item = localStorage.getItem(fullKey);
    return item ? JSON.parse(item) : null;
  }

  /** @param {string} key */
  remove(key) {
    localStorage.removeItem(`${this.#namespace}${key}`);
  }

  /**
   * @param {unknown} value
   * @returns {string}
   */
  #valueToStore(value) {
    return typeof value === 'string' ? value : JSON.stringify(value);
  }
}

export default LocalStorageService;
