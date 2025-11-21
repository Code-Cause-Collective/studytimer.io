import { css } from 'lit';

const buttonStyles = css`
  button {
    cursor: pointer !important;
  }
`;

const buttonTextVariantStyles = css`
  button[variant='text'] {
    outline: none;
    border: none;
    background: transparent;
  }
`;

export { buttonStyles, buttonTextVariantStyles };
