import { css } from 'lit';

const tabStyles = css`
  .tabs {
    display: flex;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }

  .tabs button.tab-item {
    flex: 1 1 0;
    padding: 0.75rem 1rem;
    cursor: pointer;
    border: none;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    background-color: #1f1f27;
    color: #c0c0c8;
    transition:
      background-color 0.2s,
      color 0.2s;
    border-radius: 0;
    border-right: 0.0625rem solid #2c2c35;
  }

  .tabs button.tab-item:last-child {
    border-right: none;
  }

  .tabs button.tab-item[data-tab-active='true'] {
    font-weight: 500;
    background-color: #3b3b48;
    color: #ffffff;
  }

  .tabs button.tab-item:hover {
    background-color: #353540;
  }
`;

export { tabStyles };
