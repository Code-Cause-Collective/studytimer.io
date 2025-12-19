const APP_EVENT = Object.freeze({
  FAQ_MODAL: 'faq-modal',
  SETTINGS_MODAL: 'settings-modal',
});

const AUDIO_SOUND = Object.freeze({
  ALERT_BELLS_ECHO: Object.freeze({ ID: 1, NAME: 'alert-bells-echo' }),
  CLEAR_ANNOUNCE_TONES: Object.freeze({ ID: 2, NAME: 'clear-announce-tones' }),
  HOME_STANDARD_DING_DONG: Object.freeze({
    ID: 3,
    NAME: 'home-standard-ding-dong',
  }),
  MELODIC_CLASSIC_DOOR_BELL: Object.freeze({
    ID: 4,
    NAME: 'melodic-classic-door-bell',
  }),
  UPLIFTING_FLUTE_NOTIFICATION: Object.freeze({
    ID: 5,
    NAME: 'uplifting-flute-notification',
  }),
});

const AUDIO_VOLUME = Object.freeze({
  MUTE: 0,
  TWENTY_FIVE_PERCENT: 25,
  FIFTY_PERCENT: 50,
  SEVENTY_FIVE_PERCENT: 75,
  ONE_HUNDRED_PERCENT: 100,
});

const CLIENT_ERROR_MESSAGE = Object.freeze({
  STORAGE_INVALID: 'Storage invalid.',
  STORAGE_NAMESPACE_INVALID: 'Storage namespace invalid.',
  INSTANCE_INVALID: 'Instance invalid.',
  UNKNOWN_TIMER_ACTION: 'Unknown timer action.',
  UNKNOWN_POMODORO_MODE: 'Unknown pomodoro mode.',
  NOTIFICATION_PERMISSION_DENIED: 'Notification permission denied.',
  NOTIFICATION_REQUEST_PERMISSION_FAILED:
    'Error requesting notification permission.',
  INVALID_INPUT: 'Invalid input.',
  INVALID_INPUTS: 'Input(s) invalid. Please try again.',
  INVALID_POSITIVE_INTEGER: 'Please use positive integers.',
  PLAY_SOUND_FAILED: 'Audio playback failed.',
  PRELOAD_AUDIO_FAILED: 'Failed to load audio/sound.',
});

/** @type {Readonly<Record<string, import("../index.d.js").ExerciseCategory>>} */
const EXERCISE_CATEGORY = Object.freeze({
  UPPER_BODY: 'upperBody',
  LOWER_BODY: 'lowerBody',
  CORE: 'core',
  CARDIO: 'cardio',
  MOBILITY: 'mobility',
  BALANCE: 'balance',
  FULL_BODY: 'fullBody',
  STATIC_STRENGTH: 'staticStrength',
  YOGA: 'yoga',
});

/** @type {readonly import("../index.d.js").ExerciseEntries[]} */
const EXERCISES_ENTRIES = Object.freeze([
  [
    EXERCISE_CATEGORY.UPPER_BODY,
    Object.freeze([
      'Push-ups',
      'Wide push-ups',
      'Diamond push-ups',
      'Decline push-ups',
      'Incline push-ups',
      'Shoulder taps',
    ]),
  ],
  [
    EXERCISE_CATEGORY.LOWER_BODY,
    Object.freeze([
      'Squats',
      'Lunges',
      'Reverse lunges',
      'Side lunges',
      'Curtsy lunges',
      'Bulgarian split squat',
      'Calf raises',
      'Wall sit',
      'Hip thrusts',
    ]),
  ],
  [
    EXERCISE_CATEGORY.CORE,
    Object.freeze([
      'Sit-ups',
      'Crunches',
      'Bicycle crunches',
      'Leg raises',
      'Flutter kicks',
      'Scissor kicks',
      'Russian twists',
      'Plank',
      'Side plank',
      'Mountain climbers',
      'V-ups',
      'Supermans',
    ]),
  ],
  [
    EXERCISE_CATEGORY.CARDIO,
    Object.freeze([
      'Jumping jacks',
      'Burpees',
      'Standing knee drives',
      'Invisible jump rope',
    ]),
  ],
  [
    EXERCISE_CATEGORY.MOBILITY,
    Object.freeze([
      'Hip flexor stretch',
      'Hamstring stretch',
      'Quad stretch',
      'Ankle circles',
      'Arm circles',
      'Torso twists',
    ]),
  ],
  [
    EXERCISE_CATEGORY.BALANCE,
    Object.freeze([
      'Single-leg balance hold',
      'Single-leg toe touch',
      'Heel-to-toe walk',
      'Single-leg calf raise',
    ]),
  ],
  [
    EXERCISE_CATEGORY.FULL_BODY,
    Object.freeze(['Burpees', 'Mountain climbers', 'Jumping jacks']),
  ],
  [
    EXERCISE_CATEGORY.STATIC_STRENGTH,
    Object.freeze(['Static squat hold', 'Static plank hold']),
  ],
  [
    EXERCISE_CATEGORY.YOGA,
    Object.freeze([
      'Warrior pose',
      'Chair pose',
      'Tree pose',
      'Boat pose',
      'Bridge pose',
      'Crescent lunge hold',
    ]),
  ],
]);

const EXERCISES_BY_CATEGORY_MAP = Object.freeze(new Map(EXERCISES_ENTRIES));

const POMODORO_MODE = Object.freeze({
  POMODORO: 'pomodoroMinutes',
  SHORT_BREAK: 'shortBreakMinutes',
  LONG_BREAK: 'longBreakMinutes',
});

const DEFAULT_POMODORO_TIMES = Object.freeze({
  [POMODORO_MODE.POMODORO]: 25,
  [POMODORO_MODE.SHORT_BREAK]: 5,
  [POMODORO_MODE.LONG_BREAK]: 15,
});

const POMODORO_TIMER_ACTION = Object.freeze({
  START: 'start',
  PAUSE: 'pause',
  RESET: 'reset',
});

const SETTINGS_EVENT = Object.freeze({
  SETTINGS_FORM_SUBMIT: 'settings-form-submit',
});

const STORAGE_KEY_NAMESPACE = Object.freeze({
  APP: 'studyTimer',
  SETTINGS: 'settings',
});

/** @type {Readonly<Record<string, NotificationPermission>>} */
const NOTIFICATION_PERMISSION = Object.freeze({
  DEFAULT: 'default',
  GRANTED: 'granted',
  DENIED: 'denied',
});

export {
  APP_EVENT,
  AUDIO_SOUND,
  AUDIO_VOLUME,
  CLIENT_ERROR_MESSAGE,
  EXERCISES_BY_CATEGORY_MAP,
  EXERCISE_CATEGORY,
  EXERCISES_ENTRIES,
  DEFAULT_POMODORO_TIMES,
  POMODORO_MODE,
  POMODORO_TIMER_ACTION,
  SETTINGS_EVENT,
  STORAGE_KEY_NAMESPACE,
  NOTIFICATION_PERMISSION,
};
