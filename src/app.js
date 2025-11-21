import { Router } from '@lit-labs/router';
import { LitElement, css, html, nothing } from 'lit';

import { notificationApiService } from './services/notification-api.service.js';
import { buttonStyles } from './shared/styles/buttonStyles.js';
import { captionTextStyles } from './shared/styles/captionTextStyles.js';
import { linkStyles } from './shared/styles/linkStyles.js';
import { modalStyles } from './shared/styles/modalStyles.js';
import { appStore } from './stores/app.js';
import { DEFAULT_SETTINGS, settingsStore } from './stores/settings.js';
import {
  CLIENT_ERROR_MESSAGE,
  NOTIFICATION_PERMISSION,
  SETTINGS_EVENT,
  STORAGE_KEY_NAMESPACE,
} from './utils/constants.js';
import { isBool, isNum } from './utils/helpers.js';

import './components/app-top-bar.js';
import './components/header.js';

const POMODORO_RESOURCE_LINKS = Object.freeze({
  wiki: 'https://en.wikipedia.org/wiki/Pomodoro_Technique',
  video: 'https://youtu.be/dC4ZYCiRF_w?si=ekRqmmWpnqrAZM-c&t=8',
});

const SYSTEM_NOTIFICATIONS_RESOURCE_LINKS = Object.freeze({
  MAC: 'https://support.apple.com/guide/mac-help/notifications-settings-mh40583/mac',
  LINUX:
    'https://help.ubuntu.com/stable/ubuntu-help/shell-notifications.html.en',
  WINDOWS:
    'https://support.microsoft.com/en-us/windows/notifications-and-do-not-disturb-in-windows-feeca47f-0baf-5680-16f0-8801db1a8466',
});

export class App extends LitElement {
  static properties = {
    _hasUserVisited: { type: Boolean, state: true },
    _settingsFormValues: { type: Object, state: true },
    _isPageNotFound: { type: Boolean, state: true },
    _enableNotificationsModalOpen: { type: Boolean, state: true },
    _faqModalOpen: { type: Boolean, state: true },
    _settingsModalOpen: { type: Boolean, state: true },
  };

  #router = new Router(this, [
    {
      path: '/',
      render: () => html`<home-page></home-page>`,
      enter: async () => {
        await import('./pages/home.js');
        if (this._isPageNotFound) {
          this._isPageNotFound = false;
        }
        return true;
      },
    },
    {
      path: '/*',
      render: () => {
        return html`<not-found-page></not-found-page>`;
      },
      enter: async () => {
        await import('./pages/not-found.js');
        this._isPageNotFound = true;
        return true;
      },
    },
  ]);

  constructor() {
    super();
    /** @type {boolean} */
    this._hasUserVisited = appStore.hasUserVisited;
    /** @type {import('index.d.js').Settings} */
    this._settingsFormValues = { ...DEFAULT_SETTINGS };
    /** @type {boolean} */
    this._isPageNotFound = false;
    /** @type {boolean} */
    this._enableNotificationsModalOpen = false;
    /** @type {boolean} */
    this._faqModalOpen = false;
    /** @type {boolean} */
    this._settingsModalOpen = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._settingsFormValues = { ...settingsStore.settings };
  }

  firstUpdated() {
    if (!this._hasUserVisited) {
      localStorage.setItem(
        `${STORAGE_KEY_NAMESPACE.APP}:${appStore.visitedStorageKey}`,
        'true'
      );
    }

    if (
      notificationApiService.isNotificationSupported() &&
      Notification.permission !== NOTIFICATION_PERMISSION.GRANTED &&
      !this._hasUserVisited
    ) {
      this._enableNotificationsModalOpen = true;
    }
  }

  render() {
    return html`${!this._isPageNotFound
        ? html`<app-top-bar></app-top-bar>`
        : nothing}
      <main>
        ${!this._isPageNotFound
          ? html`<app-header
              @faq-modal=${this.#onFaqNavLinkClick}
              @settings-modal=${this.#onSettingsNavLinkClick}
            ></app-header>`
          : nothing}
        <div id="outlet">${this.#router.outlet()}</div>
      </main>
      ${!this._hasUserVisited ? this.#renderFirstVisitPopover() : nothing}
      ${this.#renderEnableNotificationsModal()} ${this.#renderFaqModal()}
      ${this.#renderSettingsModal()}`;
  }

  /** @param {Event} event */
  #onFaqNavLinkClick(event) {
    if (event instanceof CustomEvent) {
      this._faqModalOpen = true;
    }
  }

  /** @param {Event} event */
  #onSettingsNavLinkClick(event) {
    if (event instanceof CustomEvent) {
      this._settingsModalOpen = true;
    }
  }

  #renderEnableNotificationsModal() {
    return html`
      <div
        class="modal"
        id="enableNotificationsModal"
        ?hidden=${!this._enableNotificationsModalOpen}
      >
        <div class="modal-content">
          <h3>Do you want to enable desktop notifications?</h3>
          <p class="caption">
            You can change this preference anytime in Settings. Also, if
            enabling desktop/browser notifications, be sure your system's
            notification (<a
              target="_blank"
              href=${SYSTEM_NOTIFICATIONS_RESOURCE_LINKS.MAC}
              >Mac</a
            >,
            <a target="_blank" href=${SYSTEM_NOTIFICATIONS_RESOURCE_LINKS.LINUX}
              >Linux (Ubuntu)</a
            >, or
            <a
              target="_blank"
              href=${SYSTEM_NOTIFICATIONS_RESOURCE_LINKS.WINDOWS}
              >Windows</a
            >) settings are turned on as well.
          </p>
          <div class="button-group">
            <button @click=${this.#onYesClick}>Yes</button>
            <button @click=${this.#onNoClick}>No</button>
          </div>
        </div>
      </div>
    `;
  }

  async #onYesClick() {
    const permissionGranted =
      await notificationApiService.requestNotificationPermission();

    if (permissionGranted) {
      settingsStore.settings = {
        ...settingsStore.settings,
        enableNotifications: true,
      };
      this._settingsFormValues = { ...settingsStore.settings };
    }

    this.#closeEnableNotificationsModal();
  }

  #onNoClick() {
    this.#closeEnableNotificationsModal();
  }

  #renderFaqModal() {
    return html`<div class="modal" id="faqModal" ?hidden=${!this._faqModalOpen}>
      <div class="modal-content">
        <h1>Frequently Asked Questions</h1>
        <div>
          <details open>
            <summary>What is Pomodoro Technique?</summary>
            <p>
              The pomodoro technique is a time management method developed by
              Francesco Cirillo in the late 1980s. It uses a kitchen timer to
              break work into intervals, typically 25 minutes in length,
              separated by short breaks. Each interval is known as a pomodoro,
              from the Italian word for tomato.
            </p>
            <p>
              Also, view short
              <a href=${POMODORO_RESOURCE_LINKS.video} target="_blank"
                >pomodoro video explantion</a
              >
              or visit
              <a href=${POMODORO_RESOURCE_LINKS.wiki} target="_blank"
                >pomodoro technique wikipedia page</a
              >
              for more information.
            </p>
          </details>
        </div>
        <button @click=${this.#closeFaqModal} class="primary">Close</button>
      </div>
    </div>`;
  }

  #renderFirstVisitPopover() {
    return html`<div id="firstVisitPopover">
      <div>
        <button
          @click=${this.#closeFirstVisitPopover}
          id="closeFirstVisitPopover"
        >
          x
        </button>
        <p>
          Thank you for visiting - continue to dream, work, collaborate, build,
          create, spread love, and most importantly I encourage you to build for
          the greater good of humanity. Also, you have agency over your life so
          think and act on your ideas. Remember, anything is possible - keep
          moving forward and keep making progress.
        </p>
        <br />
        <p>Happy studying, much peace and love.</p>
      </div>
    </div>`;
  }

  #renderSettingsModal() {
    const {
      showTimerInTitle,
      showMotivationalQuote,
      enableNotifications,
      enableExerciseDisplay,
      exercisesCount,
      exerciseReps,
      exerciseSets,
      pomodoroMinutes,
      shortBreakMinutes,
      longBreakMinutes,
    } = this._settingsFormValues;

    return html`<div
      class="modal"
      id="settingsModal"
      ?hidden=${!this._settingsModalOpen}
    >
      <div class="modal-content">
        <h1>Settings</h1>
        <div>
          <form id="settingsForm" @submit=${this.#onSubmit}>
            <h5>Preferences</h5>

            <div class="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="showTimerInTitle"
                  .checked=${showTimerInTitle}
                  @change=${this.#updateSettingsField}
                />
                Show timer in title
              </label>

              <label>
                <input
                  type="checkbox"
                  name="showMotivationalQuote"
                  .checked=${showMotivationalQuote}
                  @change=${this.#updateSettingsField}
                />
                Show motivational quote
              </label>

              <label>
                <input
                  type="checkbox"
                  name="enableNotifications"
                  .checked=${enableNotifications}
                  @change=${this.#updateSettingsField}
                />
                Enable desktop notifications
              </label>

              <label>
                <input
                  type="checkbox"
                  name="enableExerciseDisplay"
                  .checked=${enableExerciseDisplay}
                  @change=${this.#updateSettingsField}
                />
                Enable exercise display after the timer ends
              </label>
            </div>

            <div class="field-group">
              <label>
                Exercises Count:
                <input
                  type="number"
                  name="exercisesCount"
                  min="1"
                  .value=${String(exercisesCount)}
                  @input=${this.#updateSettingsField}
                />
              </label>

              <label>
                Exercise Reps:
                <input
                  type="number"
                  name="exerciseReps"
                  min="1"
                  .value=${String(exerciseReps)}
                  @input=${this.#updateSettingsField}
                />
              </label>

              <label>
                Exercise Sets:
                <input
                  type="number"
                  name="exerciseSets"
                  min="1"
                  .value=${String(exerciseSets)}
                  @input=${this.#updateSettingsField}
                />
              </label>
            </div>

            <h5>Set Times (Minutes)</h5>
            <div class="field-group">
              <label>
                Pomodoro:
                <input
                  type="number"
                  name="pomodoroMinutes"
                  min="1"
                  .value=${String(pomodoroMinutes)}
                  @input=${this.#updateSettingsField}
                />
              </label>

              <label>
                Short Break:
                <input
                  type="number"
                  name="shortBreakMinutes"
                  min="1"
                  .value=${String(shortBreakMinutes)}
                  @input=${this.#updateSettingsField}
                />
              </label>

              <label>
                Long Break:
                <input
                  type="number"
                  name="longBreakMinutes"
                  min="1"
                  .value=${String(longBreakMinutes)}
                  @input=${this.#updateSettingsField}
                />
              </label>
            </div>

            <div class="button-group">
              <button type="submit">Save</button>
              <button type="button" @click=${this.#onReset}>Reset</button>
            </div>
          </form>
        </div>
        <button @click=${this.#closeSettingsModal} class="primary">
          Close
        </button>
      </div>
    </div>`;
  }

  /** @param {Event} event */
  #onSubmit(event) {
    event.preventDefault();

    for (const value of Object.values(this._settingsFormValues)) {
      if (!isNum(value) && !isBool(value)) {
        alert(CLIENT_ERROR_MESSAGE.FORM.INVALID_INPUTS);
        return;
      } else if (isNum(value) && Number(value) <= 0) {
        alert(CLIENT_ERROR_MESSAGE.FORM.INVALID_POSITIVE_INTEGER);
        return;
      }
    }

    settingsStore.settings = this._settingsFormValues;
    settingsStore.dispatchEvent(
      new CustomEvent(SETTINGS_EVENT.SETTINGS_FORM_SUBMIT)
    );

    this.#closeSettingsModal();
  }

  #onReset() {
    this._settingsFormValues = { ...DEFAULT_SETTINGS };
  }

  /**
   * @param {InputEvent | Event} event
   */
  #updateSettingsField(event) {
    event.preventDefault();
    const { target } = event;

    if (target instanceof HTMLInputElement) {
      const { name, checked, value, type } = target;

      if (type === 'checkbox') {
        this._settingsFormValues = {
          ...this._settingsFormValues,
          [name]: isBool(checked) ? checked : false,
        };
      } else if (type === 'number') {
        this._settingsFormValues = {
          ...this._settingsFormValues,
          [name]: value,
        };
      }
    }
  }

  #closeEnableNotificationsModal() {
    this._enableNotificationsModalOpen = false;
  }

  #closeFaqModal() {
    this._faqModalOpen = false;
  }

  #closeSettingsModal() {
    this._settingsModalOpen = false;
  }

  #closeFirstVisitPopover() {
    this._hasUserVisited = true;
  }

  static styles = [
    buttonStyles,
    captionTextStyles,
    modalStyles,
    linkStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      main {
        width: min(95ch, 100% - 4rem);
        margin-inline: auto;
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      #outlet {
        flex: 1;
      }

      #firstVisitPopover {
        position: absolute;
        inset: unset;
        right: 5px;
        bottom: 5px;
        width: 350px;
        background: var(--accent);
        border-radius: 8px;
        border: 0.1px solid var(--white);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(10px);
        overflow: hidden;
        transition: all 0.4s ease;
        color: var(--lightgray);
        padding: 0.5em;
      }

      #closeFirstVisitPopover {
        position: absolute;
        top: 3px;
        right: 10px;
        padding: 0;
        margin: 0;
        background: none;
        border: none;
        font-size: 1.25rem;
        line-height: 1;
        color: var(--error);
      }

      #closeFirstVisitPopover:hover {
        opacity: 0.8;
      }

      #settingsForm {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      #settingsForm h5 {
        margin: 0;
        padding: 0;
      }

      #settingsForm .checkbox-group label:hover {
        cursor: pointer;
      }

      #settingsForm .checkbox-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.2em;
        gap: 5px;
      }

      #settingsForm .field-group {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5px;
        align-items: center;
      }

      #settingsForm .field-group input {
        max-width: 200px;
      }
    `,
  ];
}

customElements.define('app-root', App);
