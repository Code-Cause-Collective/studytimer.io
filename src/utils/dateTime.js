import { isNum } from './helpers.js';

/**
 * @param {unknown} input
 * @example 0 -> '00'
 * @returns {string}
 */
function formatToStandardTimeUnit(input) {
  const num = Number(input);

  if (!isNum(input)) {
    return '00';
  }

  return String(num).padStart(2, '0');
}

export { formatToStandardTimeUnit };
