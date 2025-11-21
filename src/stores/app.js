import LocalStorageService from '../services/local-storage.service.js';
import {
  CLIENT_ERROR_MESSAGE,
  STORAGE_KEY_NAMESPACE,
} from '../utils/constants.js';
import detectUserAgent from '../utils/detectUserAgent.js';

class AppStore {
  /** @type {string} */
  #visitedStorageKey = 'visited';
  /** @type {import("../index.d.js").UserAgent} */
  #userAgent = 'unknown';
  /** @type {boolean} */
  #hasUserVisited = true;

  /** @param {LocalStorageService} appStorage */
  constructor(appStorage) {
    if (!appStorage || !(appStorage instanceof LocalStorageService)) {
      throw new Error(CLIENT_ERROR_MESSAGE.STORAGE_INVALID);
    }
    const hasUserVisitedValue = appStorage.get(this.#visitedStorageKey);
    this.#hasUserVisited =
      hasUserVisitedValue !== null ? Boolean(hasUserVisitedValue) : false;

    const userAgent = detectUserAgent();
    if (
      [
        'chrome',
        'chromium',
        'edge',
        'firefox',
        'opera',
        'safari',
        'seamonkey',
      ].includes(userAgent)
    ) {
      this.#userAgent = userAgent;
    } else {
      this.#userAgent = 'unknown';
    }
  }

  get visitedStorageKey() {
    return this.#visitedStorageKey;
  }

  get hasUserVisited() {
    return this.#hasUserVisited;
  }

  get userAgent() {
    return this.#userAgent;
  }
}

export const appStore = new AppStore(
  new LocalStorageService(STORAGE_KEY_NAMESPACE.APP)
);
