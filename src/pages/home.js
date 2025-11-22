import { LitElement, css, html, nothing } from 'lit';

import { notificationApiService } from '../services/notification-api.service.js';
import { buttonStyles } from '../shared/styles/buttonStyles.js';
import { checkboxStyles } from '../shared/styles/checkboxStyles.js';
import ExercisesStore from '../stores/exercises.js';
import { DEFAULT_SETTINGS, settingsStore } from '../stores/settings.js';
import {
  CLIENT_ERROR_MESSAGE,
  DEFAULT_POMODORO_TIMES,
  POMODORO_MODE,
  POMODORO_TIMER_ACTION,
  SETTINGS_EVENT,
} from '../utils/constants.js';
import { formatToStandardTimeUnit } from '../utils/dateTime.js';
import { toSentenceCase, toTitleCase } from '../utils/helpers.js';

// TODO: Fetch from API instead?
/** @returns {string} */
function getRandomMotivationalQuote() {
  const motivationalQuotes = [
    'Believe in yourself and all that you are.',
    'Your only limit is your mind.',
    'Dream big. Start small. Act now.',
    'Success begins with self belief.',
    'You are stronger than you think.',
    'Great things never come from comfort zones.',
    "Don't wait for opportunity. Create it.",
    'Stay positive. Work hard. Make it happen.',
    'Every day is a second chance.',
    'Do what scares you — grow from it.',
    'Your potential is endless.',
    'Be the energy you want to attract.',
    'Turn your wounds into wisdom.',
    'Progress, not perfection.',
    'You are capable of amazing things.',
    "Believe you can and you're halfway there.",
    'Make your life a masterpiece.',
    'The best view comes after the hardest climb.',
    'Stay hungry. Stay foolish.',
    'Challenges are what make life interesting.',
    'Push yourself. Because no one else will.',
    'Every setback is a setup for a comeback.',
    'Success is the sum of small efforts repeated daily.',
    'Be fearless in the pursuit of what sets your soul on fire.',
    'Your future is created by what you do today.',
    'Dream it. Wish it. Do it.',
    'Do something today that your future self will thank you for.',
    'Rise up. Start fresh. See the bright opportunity in each day.',
    "You didn't come this far to only come this far.",
    'When you feel like quitting, think about why you started.',
    'Little by little, a little becomes a lot.',
    'Believe in your infinite potential.',
    "Don't stop until you're proud.",
    'Keep going — your greatest self is yet to come.',
    'Doubt kills more dreams than failure ever will.',
    'Be brave enough to start a conversation that matters.',
    'Act as if what you do makes a difference — because it does.',
    "Hard work beats talent when talent doesn't work hard.",
    "Turn your can'ts into cans and your dreams into plans.",
    'The only way to do great work is to love what you do.',
    'Stay focused and never give up.',
    'Small steps in the right direction are better than big steps nowhere.',
    'Success is not for the lazy.',
    'You are your only limit.',
    "Be so good they can't ignore you.",
    'Forget the mistake. Remember the lesson.',
    'There is no substitute for consistency.',
    "Don't wish it were easier. Wish you were better.",
    "Your dreams don't have an expiration date.",
    "Go the extra mile — it's never crowded.",
    'Believe in your dreams and they may come true.',
    'One day or day one — you decide.',
    'Dare to be different.',
    'You will never regret being kind.',
    'The only time you fail is when you fall down and stay down.',
    'Rise by lifting others.',
    "Be proud of how far you've come.",
    'You are doing better than you think.',
    'Stay positive. Better days are coming.',
    'Your mindset determines your success.',
    'Be persistent. Your breakthrough is coming.',
    'Embrace the journey.',
    'Turn your dreams into action.',
    "Strength grows in the moments when you think you can't go on but you keep going anyway.",
    "Don't count the days. Make the days count.",
    'Believe in your power to be, do, and have whatever you can dream.',
    "You don't have to be perfect to be amazing.",
    'Life is 10% what happens to you and 90% how you react to it.',
    "The harder you work for something, the greater you'll feel when you achieve it.",
    'You are more capable than you realize.',
    "Success doesn't come from what you do occasionally.",
    'Be the change you wish to see.',
    'Whatever you are, be a good one.',
    'Push yourself because no one else is going to do it for you.',
    "Don't wait. The time will never be just right.",
    "Failure is not the opposite of success — it's part of success.",
    "You miss 100% of the shots you don't take.",
    'If you get tired, learn to rest, not to quit.',
    "Today's struggle is tomorrow's strength.",
    'You are built for greatness.',
    'Be a voice, not an echo.',
    'Take the risk or lose the chance.',
    'Let your faith be bigger than your fear.',
    "Don't let yesterday take up too much of today.",
    'Life begins at the end of your comfort zone.',
    'Wake up with determination. Go to bed with satisfaction.',
    'Proof that you can do anything you set your mind to.',
    "Create the life you can't wait to wake up to.",
    'Stay patient. Your time is coming.',
    "It's never too late to be what you might have been.",
    "Go as far as you can see; when you get there, you'll be able to see further.",
    'Let your dreams be bigger than your fears.',
    'Be fearless in the chase of what sets your heart on fire.',
    'With the new day comes new strength and new thoughts.',
    'Believe there is good in the world.',
    'You are never too small to make a difference.',
    'A little progress each day adds up to big results.',
    'Every moment is a fresh beginning.',
    'Trust the process.',
    "You've got this.",
    'You have agency over your life, so act on your ideas.',
    'Keep moving forward and never give up. Just get better 1% each day.',
    "100% of the people who don't make it quit. Likewise, just keep going.",
  ];
  return motivationalQuotes[
    Math.floor(Math.random() * motivationalQuotes.length)
  ];
}

const POMODORO_MODES = Object.values(POMODORO_MODE);

export class HomePage extends LitElement {
  static properties = {
    _motivationalQuote: { type: String, state: true },
    _selectedPomodoroMode: { type: String, state: true },
    _exercises: { type: Array, state: true },
    _showExercises: { type: Array, state: true },
    _settings: { type: Object, state: true },
    _minutes: { type: Number, state: true },
    _seconds: { type: Number, state: true },
  };
  #totalTimeSeconds = DEFAULT_POMODORO_TIMES[POMODORO_MODE.POMODORO] * 60;
  /** @type {number} */
  #remainingTimeSeconds = this.#totalTimeSeconds;
  /** @type {NodeJS.Timeout | null} */
  #intervalId = null;
  /** @type {boolean} */
  #isRunning = false;

  constructor() {
    super();
    /** @type {string} */
    this._motivationalQuote = getRandomMotivationalQuote();
    /** @type {import('index.d.js').PomodoroModeKind} */
    this._selectedPomodoroMode = POMODORO_MODE.POMODORO;
    /** @type {import('index.d.js').Settings} */
    this._settings = { ...DEFAULT_SETTINGS };
    /** @type {number} */
    this._minutes = 0;
    /** @type {number} */
    this._seconds = 0;
    /** @type {import("../index.d.js").Exercise[]} */
    this._exercises = [];
    /** @type {boolean} */
    this._showExercises = false;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.#handleShortcut);
    this._settings = { ...settingsStore.settings };
    this.#reset();
    settingsStore.addEventListener(
      SETTINGS_EVENT.SETTINGS_FORM_SUBMIT,
      this.#onSettingsFormSubmit
    );
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.#handleShortcut);
    super.disconnectedCallback();
    settingsStore.removeEventListener(
      SETTINGS_EVENT.SETTINGS_FORM_SUBMIT,
      this.#onSettingsFormSubmit
    );
  }

  /** @returns {HTMLButtonElement[]} */
  get #pomodoroModeButtonEls() {
    return Array.from(
      this.renderRoot?.querySelectorAll('button[data-mode]') ?? []
    );
  }

  /** @returns {Record<import('index.d.js').PomodoroModeKind, number>} */
  get #pomodoroModes() {
    const { pomodoroMinutes, shortBreakMinutes, longBreakMinutes } =
      this._settings;
    return {
      pomodoroMinutes,
      shortBreakMinutes,
      longBreakMinutes,
    };
  }

  render() {
    const {
      enableExerciseDisplay,
      exerciseReps,
      exerciseSets,
      showMotivationalQuote,
    } = this._settings;

    return html` <div class="container">
      <section id="pomodoroModes">
        ${POMODORO_MODES.map((mode) => {
          return html` <button
            @click=${this.#selectMode}
            data-mode=${mode}
            data-selected=${this._selectedPomodoroMode === mode}
            type="button"
          >
            ${toTitleCase(mode).replace(/minutes/i, '')}
          </button>`;
        })}
      </section>

      <section id="pomodoroTime">
        <h1 id="pomodoroTimer">
          ${formatToStandardTimeUnit(this._minutes)}:${formatToStandardTimeUnit(
            this._seconds
          )}
        </h1>
        <div class="timer-actions">
          ${Object.values(POMODORO_TIMER_ACTION).map((action) => {
            return html`<button
              @click=${this.#selectTimerAction}
              data-timer-action=${action}
              type="button"
            >
              ${toSentenceCase(action)}
            </button>`;
          })}
        </div>
      </section>

      ${showMotivationalQuote
        ? html`<section id="motivationalQuote">
            <h2 id="quote">${this._motivationalQuote}</h2>
          </section>`
        : nothing}
      ${this._showExercises && enableExerciseDisplay
        ? html`<section id="exercises">
            <div class="exercise-container">
              <h2>Exercises</h2>
              <div class="table-wrapper">
                <table id="exerciseTable">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Name</th>
                      <th>Reps</th>
                      <th>Set(s)</th>
                      <th>Done</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this._exercises?.map(
                      (exercise, index) => html`
                        <tr data-row="${index + 1}">
                          <td data-label="type">
                            ${toSentenceCase(exercise.category)}
                          </td>
                          <td data-label="name">${exercise.name}</td>
                          <td data-label="reps">${String(exerciseReps)}</td>
                          <td data-label="sets">${String(exerciseSets)}</td>
                          <td data-label="done">
                            <input type="checkbox" .checked=${false} />
                          </td>
                        </tr>
                      `
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>`
        : nothing}
    </div>`;
  }

  /** @param {Event} event */
  #selectMode({ target }) {
    if (target instanceof HTMLButtonElement) {
      const mode = /** @type {import("../index.d.js").PomodoroModeKind} */ (
        target?.dataset.mode
      );

      if (POMODORO_MODES.includes(mode)) {
        this._selectedPomodoroMode = mode;
        this.#reset(false);

        for (const buttonEl of this.#pomodoroModeButtonEls) {
          if (buttonEl instanceof HTMLButtonElement) {
            buttonEl.dataset.selected = 'false';
          }
        }

        target.dataset.selected = 'true';
        this.#start();
        this.#dismissExercises();
      } else {
        console.warn(CLIENT_ERROR_MESSAGE.UNKNOWN_POMODORO_MODE);
      }
    }
  }

  /** @param {Event} event */
  #selectTimerAction({ target }) {
    if (target instanceof HTMLButtonElement) {
      const action =
        /** @type {import("../index.d.js").PomodoroTimerAction} */ (
          target?.dataset.timerAction
        );

      switch (action) {
        case POMODORO_TIMER_ACTION.START:
          {
            // Check if timer is complete
            const timerComplete = this._minutes === 0 && this._seconds === 0;

            // Only start if not running and timer is not complete
            if (!this.#isRunning && !timerComplete) {
              this.#start();
              this.#dismissExercises();
            }
          }
          break;
        case POMODORO_TIMER_ACTION.PAUSE:
          this.#pause();
          break;
        case POMODORO_TIMER_ACTION.RESET:
          this.#reset();
          this.#dismissExercises();
          break;
        default:
          console.warn(CLIENT_ERROR_MESSAGE.UNKNOWN_TIMER_ACTION);
      }
    }
  }

  #start() {
    if (!this.#isRunning) {
      this.#isRunning = true;
      this.#intervalId = setInterval(() => {
        if (this.#remainingTimeSeconds > 0) {
          this.#remainingTimeSeconds--;
          this.#updatePomodoroTimer();
        } else {
          this.#pause();
          this.#complete();
        }
      }, 1000);
    }
  }

  #pause() {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
    }
    this.#isRunning = false;
    this.#intervalId = null;
  }

  /** @param {boolean} [pause] */
  #reset(pause = true) {
    pause && this.#pause();
    this.#totalTimeSeconds =
      this.#pomodoroModes[this._selectedPomodoroMode] * 60;
    this.#remainingTimeSeconds = this.#totalTimeSeconds;
    this.#updatePomodoroTimer();
  }

  /** @param {KeyboardEvent} event */
  #handleShortcut = (event) => {
    // ALT + key shortcuts for modes
    if (event.altKey) {
      let targetButton;
      switch (event.key.toLowerCase()) {
        case 'p':
          // Find the Pomodoro mode button
          targetButton = this.#pomodoroModeButtonEls.find(
            (b) => b.dataset.mode === POMODORO_MODE.POMODORO
          );
          break;
        case 's':
          // Short Break mode button
          targetButton = this.#pomodoroModeButtonEls.find(
            (b) => b.dataset.mode === POMODORO_MODE.SHORT_BREAK
          );
          break;
        case 'l':
          // Long Break mode button
          targetButton = this.#pomodoroModeButtonEls.find(
            (b) => b.dataset.mode === POMODORO_MODE.LONG_BREAK
          );
          break;
        case 'r':
          // Trigger reset action
          this.#triggerTimerAction(POMODORO_TIMER_ACTION.RESET);
          event.preventDefault();
          return;
        default:
          return;
      }

      // If a button was found, simulate the click and change the mode
      if (targetButton) {
        const simulatedEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        });

        targetButton.dispatchEvent(simulatedEvent);
      }
    }

    // SPACE key to toggle start/pause
    if (event.code === 'Space') {
      this.#triggerTimerAction(
        this.#isRunning
          ? POMODORO_TIMER_ACTION.PAUSE
          : POMODORO_TIMER_ACTION.START
      );
      event.preventDefault();
    }
  };

  /** @param {'start' | 'pause' | 'reset'} action*/
  #triggerTimerAction(action) {
    switch (action) {
      case POMODORO_TIMER_ACTION.START: {
        const timerComplete = this._minutes === 0 && this._seconds === 0;

        if (!this.#isRunning && !timerComplete) {
          this.#start();
          this.#dismissExercises();
        }
        break;
      }

      case POMODORO_TIMER_ACTION.PAUSE: {
        this.#pause();
        break;
      }

      case POMODORO_TIMER_ACTION.RESET: {
        this.#reset();
        this.#dismissExercises();
        break;
      }

      default:
        console.warn('Unknown timer action:', action);
    }
  }

  #complete() {
    const { enableNotifications, exercisesCount, showMotivationalQuote } =
      this._settings;
    const isPomodoroModeSelected =
      this._selectedPomodoroMode === POMODORO_MODE.POMODORO;

    if (enableNotifications) {
      notificationApiService.sendDesktopNotification(
        `${toSentenceCase(this._selectedPomodoroMode).replace(/minutes/i, '')} time is up!`,
        isPomodoroModeSelected
          ? 'Take a break or start a new Pomodoro session.'
          : 'Start a new Pomodoro session.'
      );
    }

    if (showMotivationalQuote) {
      this._motivationalQuote = getRandomMotivationalQuote();
    }

    if (isPomodoroModeSelected) {
      this._showExercises = true;
      this._exercises = ExercisesStore.getRandomExercises(exercisesCount);
    }
  }

  #updatePomodoroTimer() {
    const minutes = Math.floor(this.#remainingTimeSeconds / 60);
    const seconds = this.#remainingTimeSeconds % 60;

    this._minutes = minutes;
    this._seconds = seconds;

    document.title = this._settings.showTimerInTitle
      ? `(${formatToStandardTimeUnit(this._minutes)}:${formatToStandardTimeUnit(this._seconds)}) ${import.meta.env.VITE_APP_TITLE}`
      : import.meta.env.VITE_APP_TITLE;
  }

  #dismissExercises() {
    this._showExercises = false;
    this._exercises = [];
  }

  /** @param {Event} event */
  #onSettingsFormSubmit = (event) => {
    if (event instanceof CustomEvent) {
      this._settings = { ...settingsStore.settings };
      this.#reset();
    }
  };

  static styles = [
    buttonStyles,
    checkboxStyles,
    css`
      .container {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
      }

      button {
        padding: 0.5em;
        border-radius: 5px;
        font-weight: bold;
      }

      button:hover {
        opacity: 0.8;
      }

      #pomodoroModes {
        display: flex;
        flex-direction: row;
        width: 100%;
        gap: 10px;
      }

      #pomodoroModes > button {
        width: 100%;
        background-color: var(--primary);
        outline: none;
        border: none;
        color: var(--black);
      }

      #pomodoroModes > button[data-selected='true'] {
        background-color: var(--accent);
        border: 0.5px solid var(--white);
        color: var(--primary);
      }

      #pomodoroTime {
        display: flex;
        flex-direction: column;
      }

      #pomodoroTimer {
        font-size: 5rem;
        text-align: center;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .timer-actions {
        display: flex;
        justify-content: center;
        gap: 10px;
      }

      .timer-actions > button {
        width: 80px;
      }

      [data-timer-action='start'] {
        background-color: green;
        border: none;
        color: white;
      }

      [data-timer-action='pause'] {
        background-color: red;
        border: none;
        color: white;
      }

      [data-timer-action='reset'] {
        background-color: grey;
        border: none;
        color: white;
      }

      #motivationalQuote {
        display: flex;
        justify-content: center;
      }

      #quote h2,
      .exercise-container h2 {
        font-size: clamp(1.25rem, 2.5vw + 0.5rem, 2rem);
        line-height: 1.3;
        font-weight: 600;
        margin: 0;
      }

      #quote {
        text-align: center;
        font-style: italic;
        color: var(--lightgray);
        position: relative;
        display: inline-block;
      }

      #quote::before {
        content: '“';
        margin-right: 0.25rem;
      }

      #quote::after {
        content: '”';
        margin-left: 0.25rem;
      }

      #exercises {
        max-width: 800px;
        margin: auto;
        color: var(--accent);
        margin-bottom: 1.5em;
      }

      .exercise-container h2 {
        text-align: center;
        margin-bottom: 1rem;
        color: var(--white);
      }

      .table-wrapper {
        overflow-x: auto;
        border-radius: 5px;
        border: 1px solid transparent;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        word-wrap: break-word;
      }

      thead {
        background: var(--accent);
      }

      thead tr th {
        color: var(--primary);
      }

      th,
      td {
        padding: 12px 16px;
        text-align: left;
        color: var(--accent);
        word-break: break-word;
      }

      th {
        font-weight: bold;
      }

      tbody tr:nth-child(odd) {
        background: #e0f0ee;
      }

      tbody tr:nth-child(even) {
        background: var(--white);
      }

      tbody tr:hover {
        background: #d2e8e6;
      }

      @media only screen and (max-width: 640px) {
        #pomodoroModes {
          flex-wrap: wrap;
        }

        table,
        thead,
        tbody,
        th,
        tr {
          display: block;
        }

        thead {
          display: none;
        }

        tr {
          background: #ffffff;
          margin-bottom: 1rem;
          padding: 1rem;
          border-radius: 5px;
          word-wrap: break-word;
        }

        td {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 10px 0;
          font-size: 0.95rem;
          border-bottom: 1px solid #ddd;
        }

        td:last-child {
          border-bottom: none;
        }

        tbody tr:nth-child(odd),
        tbody tr:nth-child(even) {
          background: var(--white);
        }

        tbody tr:hover {
          opacity: 0.8;
        }

        td::before {
          content: attr(data-label);
          font-weight: bold;
          flex: 0 0 100%;
          color: var(--accent);
          margin-bottom: 2px;
        }
      }
    `,
  ];
}

customElements.define('home-page', HomePage);
