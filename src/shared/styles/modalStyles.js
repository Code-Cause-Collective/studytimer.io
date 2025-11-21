import { css } from 'lit';

const modalStyles = css`
  .modal {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    z-index: 9999;
    pointer-events: auto;
    --backdrop-color: rgba(0, 0, 0, 0.4);
  }

  .modal::before {
    content: '';
    position: fixed;
    inset: 0;
    background-color: var(--backdrop-color);
    z-index: -1;
  }

  .modal[hidden] {
    display: none;
  }

  .modal-content {
    background: var(--accent, #fff);
    padding: 1.5rem;
    max-width: 480px;
    width: 90%;
    max-height: 80%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 0;
    overflow-y: auto;
  }

  .modal-content h1,
  .modal-content h2,
  .modal-content h3 {
    margin-top: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary, #222);
  }

  .modal-content h4,
  .modal-content h5,
  .modal-content h6 {
    margin-top: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary, #222);
  }

  .modal-content p {
    margin: 0.5rem 0 1rem;
    line-height: 1.5;
    color: var(--lightgray, #555);
  }

  .modal-content button {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 0.5px solid var(--gray);
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    width: 100%;
    margin-top: 1em;
  }

  .modal-content button.primary {
    background: var(--accent, #2563eb);
    color: var(--white);
  }

  .modal-content button.primary:hover {
    opacity: 0.8;
  }

  .modal-content button.secondary {
    background: #f3f4f6;
    color: #111;
  }

  .modal-content button.secondary:hover {
    background: #e5e7eb;
  }

  details:hover {
    cursor: pointer;
  }
`;

export { modalStyles };
