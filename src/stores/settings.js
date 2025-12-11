import LocalStorageService from '../services/local-storage.service.js';
import {
  AUDIO_SOUND,
  AUDIO_VOLUME,
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

  //NEW: multi-select category filter (empty = allow all)
  selectedExerciseCategories: [],

  enableNotifications: false,
  showTimerInTitle: false,
  showMotivationalQuote: true,
  audioSound: AUDIO_SOUND.MELODIC_CLASSIC_DOOR_BELL.ID,
  audioVolume: AUDIO_VOLUME.FIFTY_PERCENT,
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

    // Load settings from storage
    const settingsMap = new Map(Object.entries(this.#settings));

    for (const [key, defaultValue] of settingsMap.entries()) {
      const storedValue = this.#settingsStorage.get(key);

      //FIXED: now supports arrays (for multi-select)
      const value =
      let value = /** @type {boolean | number} */ (
        storedValue === null
          ? defaultValue
          : Array.isArray(defaultValue) && Array.isArray(storedValue)
            ? storedValue
            : (isBool(defaultValue) && isBool(storedValue)) ||
                (isNum(defaultValue) && isNum(storedValue))
              ? storedValue
              : defaultValue;

      if (key === 'audioSound' && typeof value === 'number') {
        const matchingAudioSound = Object.values(AUDIO_SOUND).find(
          ({ ID }) => ID === value
        );
        if (matchingAudioSound === undefined) {
          value = defaultValue;
        }
      } else if (key === 'audioVolume' && typeof value === 'number') {
        const matchingAudioVolume = Object.values(AUDIO_VOLUME).find(
          (volume) => volume === value
        );
        if (matchingAudioVolume === undefined) {
          value = defaultValue;
        }
      }

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
      const val = valueMap.has(key) ? valueMap.get(key) : defaultValue;

      //FIXED: now supports arrays (for multi-select)
      const newValue =
        Array.isArray(defaultValue) && Array.isArray(val)
          ? val
          : isBool(val) || isNum(val)
            ? val
            : defaultValue;

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
