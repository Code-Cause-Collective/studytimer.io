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
  DEFAULT_POMODORO_TIMES,
  POMODORO_MODE,
  POMODORO_TIMER_ACTION,
  SETTINGS_EVENT,
  STORAGE_KEY_NAMESPACE,
  NOTIFICATION_PERMISSION,
};
