/**
 * @param {unknown} input
 * @returns {boolean}
 */
function isBool(input) {
  return typeof input === 'boolean';
}

/**
 * @param {unknown} input
 * @returns {boolean}
 */
function isNum(input) {
  if (typeof input === 'number') {
    return !isNaN(input);
  }

  if (typeof input === 'string') {
    const parsed = parseFloat(input);
    return !isNaN(parsed);
  }

  return false;
}

/**
 *  @param {unknown} input
 *  @returns {string}
 */
function toSentenceCase(input) {
  const strClean =
    typeof input === 'string' && input.length > 0 ? input.trim() : null;
  if (!strClean) {
    return '';
  }

  const withSpaces = strClean.replace(/([A-Z])/g, ' $1');

  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
}

/**
 * @param {unknown} input
 * @returns {string}
 */
function toTitleCase(input) {
  const strClean =
    typeof input === 'string' && input.length > 0 ? input.trim() : null;
  if (!strClean) {
    return '';
  }

  const withSpaces = strClean.replace(/([A-Z])/g, ' $1');

  return withSpaces
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export { isBool, isNum, toTitleCase, toSentenceCase };
