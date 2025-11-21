const APP_EVENT = Object.freeze({
  FAQ_MODAL: 'faq-modal',
  SETTINGS_MODAL: 'settings-modal',
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
  FORM: Object.freeze({
    INVALID_INPUTS: 'Input(s) invalid. Please try again.',
    INVALID_POSITIVE_INTEGER: 'Please use positive integers.',
  }),
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
  CLIENT_ERROR_MESSAGE,
  DEFAULT_POMODORO_TIMES,
  POMODORO_MODE,
  POMODORO_TIMER_ACTION,
  SETTINGS_EVENT,
  STORAGE_KEY_NAMESPACE,
  NOTIFICATION_PERMISSION,
};
