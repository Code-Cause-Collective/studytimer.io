import { css } from 'lit';

const dialogStyles = css`
  dialog {
    border: none;
    padding: 1.5rem;
    max-width: 480px;
    width: 90%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    background: var(--accent);
    max-height: 80%;
    border-radius: 10px;
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
    transition:
      opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      overlay 0.4s ease,
      display 0.4s ease;
  }

  dialog:open {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  @starting-style {
    dialog:open {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
  }

  dialog::backdrop {
    background-color: transparent;
    transition: background-color 0.4s ease;
  }

  dialog:open::backdrop {
    background-color: rgba(0, 0, 0, 0.4);
  }

  @starting-style {
    dialog:open::backdrop {
      background-color: transparent;
    }
  }

  dialog h1,
  dialog h2,
  dialog h3 {
    margin-top: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary, #222);
  }

  dialog h4,
  dialog h5,
  dialog h6 {
    margin-top: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary, #222);
  }

  dialog p {
    margin: 0.5rem 0 1rem;
    line-height: 1.5;
    color: var(--lightgray, #555);
  }

  dialog button {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    width: 100%;
  }

  dialog button {
    border: 0.5px solid var(--gray);
    margin-top: 1em;
  }

  dialog button.primary {
    background: var(--accent, #2563eb);
    color: var(--white);
  }

  dialog button.primary:hover {
    opacity: 0.8;
  }

  dialog button.secondary {
    background: #f3f4f6;
    color: #111;
  }

  dialog button.secondary:hover {
    background: #e5e7eb;
  }

  details:hover {
    cursor: pointer;
  }
`;

export { dialogStyles };
