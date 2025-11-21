import { LitElement, css, html, nothing } from 'lit';

import github from '../assets/images/github-icon.png';
import { tooltipStyles } from '../shared/styles/tooltipStyles.js';

export class AppTopBar extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html` <div id="topBar">
      <div class="content">
        <div class="left">
          ${import.meta.env.MODE === 'development'
            ? html`<span>[DEV]</span>`
            : nothing}
          <button class="info-button">i</button>
          Powered by
          <a href="https://codecause.dev/" target="_blank"><b>Code Cause</b></a>
        </div>

        <div class="right">
          <div class="tooltip tooltip-left">
            <a
              href="https://github.com/Code-Cause-Collective/studytimer.io"
              target="_blank"
            >
              <img class="github-icon" src=${github} alt="github icon" />
            </a>
            <span class="tooltiptext"
              >Contribute to ${import.meta.env.VITE_APP_NAME}</span
            >
          </div>
        </div>
      </div>
    </div>`;
  }

  static styles = [
    tooltipStyles,
    css`
      :host {
        color: var(--lightgray);
      }

      #topBar {
        width: 100%;
        background-color: #1a1a1a;
        font-size: 0.9rem;
        padding: 0.3rem 0;
      }

      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 1.5rem;
      }

      .left,
      .right {
        display: flex;
        align-items: center;
        gap: 0.3em;
      }

      a {
        text-decoration: none;
        color: var(--lightgray);
        transition: opacity 0.3s ease;
      }

      a:hover {
        opacity: 0.8;
      }

      .info-button {
        width: 15px;
        height: 15px;
        font-weight: bold;
        border: 1px solid var(--lightgray);
        cursor-pointer: default;
        border-radius: 50%;
        background-color: transparent;
        color: var(--lightgray);
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
          opacity 0.3s ease,
          background-color 0.3s ease;
      }

      .github-icon {
        filter: brightness(2) invert(1);
        width: 20px;
        height: 20px;
        display: block;
      }
    `,
  ];
}

customElements.define('app-top-bar', AppTopBar);
