/** @typedef {"pomodoroMinutes" | "shortBreakMinutes" | "longBreakMinutes"} PomodoroModeKind */

/** @typedef {"start" | "pause" | "reset"} PomodoroTimerAction */

/** @typedef {Record<PomodoroModeKind, number>} PomodoroMode */

/** @typedef {"chrome" | "chromium" | "edge" | "firefox" | "opera" | "safari" | "seamonkey" | "unknown"} UserAgent */

/** @typedef {"upperBody" | "lowerBody" | "core" | "cardio" | "mobility" | "balance" | "fullBody" | "staticStrength" | "yoga"} ExerciseCategory */

/** @typedef {[ExerciseCategory, readonly string[]]} ExerciseEntries */

/** @typedef {Partial<Record<ExerciseCategory, string[]>>} ExerciseByCategory */

/**
 * @typedef {Record<string, string>} Exercise
 * @property {string} category
 * @property {string} name
 */

/**
 * @typedef {object} Settings
 * @property {boolean} showTimerInTitle
 * @property {boolean} showMotivationalQuote
 * @property {boolean} enableNotifications
 * @property {boolean} showExercises
 * @property {ExerciseByCategory} exercisesByCategory
 * @property {number} exerciseReps
 * @property {number} exerciseSets
 * @property {number} pomodoroMinutes
 * @property {number} shortBreakMinutes
 * @property {number} longBreakMinutes
 * @property {number} audioSound
 * @property {number} audioVolume
 */

export {};
