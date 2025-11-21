import LocalStorageService from '../services/local-storage.service.js';
import {
  CLIENT_ERROR_MESSAGE,
  DEFAULT_POMODORO_TIMES,
  STORAGE_KEY_NAMESPACE,
} from '../utils/constants.js';
import { isBool, isNum } from '../utils/helpers.js';

/** @type {import('index.d.js').Settings} */
export const DEFAULT_SETTINGS = Object.freeze({
  enableExerciseDisplay: true,
  exerciseReps: 5,
  exerciseSets: 1,
  exercisesCount: 1,
  enableNotifications: false,
  showTimerInTitle: false,
  showMotivationalQuote: true,
  ...DEFAULT_POMODORO_TIMES,
});

class SettingsStore extends EventTarget {
  /** @type {import("../index.d.js").Settings} */
  #settings = { ...DEFAULT_SETTINGS };
  /** @type {LocalStorageService} */
  #settingsStorage;

  /** @param {LocalStorageService} settingsStorage */
  constructor(settingsStorage) {
    super();
    if (!settingsStorage || !(settingsStorage instanceof LocalStorageService)) {
      throw new Error(CLIENT_ERROR_MESSAGE.STORAGE_INVALID);
    }
    this.#settingsStorage = settingsStorage;

    // Load settings from storage on init
    const settingsMap = new Map(Object.entries(this.#settings));

    for (const [key, defaultValue] of settingsMap.entries()) {
      const storedValue = /** @type {boolean | number | null} */ (
        this.#settingsStorage.get(key)
      );

      const value = /** @type {boolean | number} */ (
        storedValue === null
          ? defaultValue
          : (isBool(defaultValue) && isBool(storedValue)) ||
              (isNum(defaultValue) && isNum(storedValue))
            ? storedValue
            : defaultValue
      );

      settingsMap.set(key, value);
      this.#settingsStorage.set(key, value);
    }

    this.#settings = /** @type {import('index.d.js').Settings} */ (
      Object.fromEntries(settingsMap)
    );
  }

  /** @returns {import('index.d.js').Settings} */
  get settings() {
    return this.#settings;
  }

  /** @param {import("../index.d.js").Settings} value */
  set settings(value) {
    const valueMap = new Map(Object.entries(value));
    const settingsMap = new Map(Object.entries(this.#settings));

    for (const [key, defaultValue] of Object.entries(DEFAULT_SETTINGS)) {
      const val = /** @type {boolean | number} */ (
        valueMap.has(key) ? valueMap.get(key) : defaultValue
      );

      const newValue = isBool(val) || isNum(val) ? val : defaultValue;

      settingsMap.set(key, newValue);
      this.#settingsStorage.set(key, newValue);
    }

    this.#settings = /** @type {import('index.d.js').Settings} */ (
      Object.fromEntries(settingsMap)
    );
  }
}

export const settingsStore = new SettingsStore(
  new LocalStorageService(STORAGE_KEY_NAMESPACE.SETTINGS)
);
