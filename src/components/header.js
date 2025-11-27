import { LitElement, css, html } from 'lit';

import logo from '../assets/images/logo.png';
import {
  buttonStyles,
  buttonTextVariantStyles,
} from '../shared/styles/buttonStyles.js';
import { APP_EVENT } from '../utils/constants.js';

export class Header extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`<header>
      <nav>
        <div class="nav-logo">
          <img
            class="logo"
            src=${logo}
            alt=${`${import.meta.env.VITE_APP_NAME.toLowerCase()} logo`}
          />
          <p class="app-name" aria-current="page">
            ${import.meta.env.VITE_APP_NAME}
          </p>
        </div>

        <div class="nav-links">
          <button @click=${this.#faqLinkClick} class="nav-link" variant="text">
            FAQ
          </button>
          <button
            @click=${this.#settingsLinkClick}
            class="nav-link"
            variant="text"
          >
            Settings
          </button>
        </div>
      </nav>
    </header>`;
  }

  #faqLinkClick() {
    this.dispatchEvent(
      new CustomEvent(APP_EVENT.FAQ_MODAL, {
        bubbles: true,
        composed: true,
      })
    );
  }

  #settingsLinkClick() {
    this.dispatchEvent(
      new CustomEvent(APP_EVENT.SETTINGS_MODAL, {
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = [
    buttonStyles,
    buttonTextVariantStyles,
    css`
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .nav-logo {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .app-name,
      button {
        color: var(--primary);
      }

      .logo {
        height: 1.8rem;
        width: auto;
        align-items: center;
        margin-right: 0.25rem;
      }

      .app-title {
        font-size: 1.125rem;
        font-weight: 500;
      }

      .nav-links {
        display: flex;
        gap: 1.5rem;
      }

      button {
        font-size: var(--default-font-size);
      }

      button[variant='text']:hover {
        opacity: 0.8;
      }

      @media only screen and (max-width: 640px) {
        :host,
        button {
          font-size: 0.85rem;
        }
      }
    `,
  ];
}

customElements.define('app-header', Header);
