import LocalStorageService from '../services/local-storage.service.js';
import {
  AUDIO_SOUND,
  AUDIO_VOLUME,
  CLIENT_ERROR_MESSAGE,
  DEFAULT_POMODORO_TIMES,
  EXERCISES_BY_CATEGORY_MAP,
  STORAGE_KEY_NAMESPACE,
} from '../utils/constants.js';
import { isBool, isNum, isPlainObject } from '../utils/helpers.js';

/** @typedef {boolean | number | import('index.d.js').ExerciseByCategory} SettingsStorageValue */

/** @typedef {keyof typeof DEFAULT_SETTINGS} SettingsKey */

/** @type {import('index.d.js').Settings} */
export const DEFAULT_SETTINGS = Object.freeze({
  showExercises: true,
  exerciseReps: 5,
  exerciseSets: 1,
  exercisesByCategory: {},
  enableNotifications: false,
  showTimerInTitle: false,
  showMotivationalQuote: true,
  audioSound: AUDIO_SOUND.MELODIC_CLASSIC_DOOR_BELL.ID,
  audioVolume: AUDIO_VOLUME.FIFTY_PERCENT,
  ...DEFAULT_POMODORO_TIMES,
});

export const SETTINGS_KEY = /** @type {Record<SettingsKey, SettingsKey>} */ (
  Object.freeze(
    Object.fromEntries(Object.keys(DEFAULT_SETTINGS).map((key) => [key, key]))
  )
);

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
      const storedValue = /** @type {SettingsStorageValue | null} */ (
        this.#settingsStorage.get(key)
      );

      let value =
        storedValue === null
          ? defaultValue
          : (isBool(defaultValue) && isBool(storedValue)) ||
              (isNum(defaultValue) && isNum(storedValue)) ||
              (isPlainObject(defaultValue) && isPlainObject(storedValue))
            ? storedValue
            : defaultValue;

      // Additional checks for specific settings
      if (key === SETTINGS_KEY.audioSound) {
        const matchingAudioSound = Object.values(AUDIO_SOUND).find(
          ({ ID }) => ID === value
        );
        if (matchingAudioSound === undefined) {
          value = defaultValue;
        }
      } else if (key === SETTINGS_KEY.audioVolume) {
        const matchingAudioVolume = Object.values(AUDIO_VOLUME).find(
          (volume) => volume === value
        );
        if (matchingAudioVolume === undefined) {
          value = defaultValue;
        }
      } else if (
        key === SETTINGS_KEY.exercisesByCategory &&
        Object.keys(value).length > 0
      ) {
        const exercisesByCategoryValue =
          /** @type {import('index.d.js').ExerciseByCategory} */ (value);

        value = Object.fromEntries(
          Object.entries(exercisesByCategoryValue)
            .filter(
              ([category, exercises]) =>
                EXERCISES_BY_CATEGORY_MAP.has(
                  /** @type {import('index.d.js').ExerciseCategory} */ (
                    category
                  )
                ) && Array.isArray(exercises)
            )
            .map(([category, exercises]) => [
              category,
              exercises.filter((exercise) =>
                EXERCISES_BY_CATEGORY_MAP.get(
                  /** @type {import('index.d.js').ExerciseCategory} */ (
                    category
                  )
                )?.includes(exercise)
              ),
            ])
        );
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

      const newValue = /** @type {SettingsStorageValue} */ (
        isBool(val) || isNum(val) || isPlainObject(val) ? val : defaultValue
      );

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
