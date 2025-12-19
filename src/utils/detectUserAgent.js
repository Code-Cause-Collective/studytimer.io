import { BROWSER } from './constants.js';

/** @returns {import("../index.d.js").UserAgent} */
function detectUserAgent() {
  const userAgent = window.navigator.userAgent;
  switch (true) {
    case userAgent.includes('Firefox/') && !userAgent.includes('Seamonkey/'):
      return BROWSER.FIREFOX;

    case userAgent.includes('Seamonkey/'):
      return BROWSER.SEAMONKEY;

    case userAgent.includes('Chrome/') &&
      !userAgent.includes('Chromium/') &&
      !userAgent.includes('Edg/'):
      return BROWSER.CHROME;

    case userAgent.includes('Chromium/'):
      return BROWSER.CHROMIUM;

    case userAgent.includes('Edg/'):
      return BROWSER.EDGE;

    case userAgent.includes('Safari/') &&
      !userAgent.includes('Chrome/') &&
      !userAgent.includes('Chromium/'):
      return BROWSER.SAFARI;

    case userAgent.includes('OPR/'):
      return BROWSER.OPERA;

    case userAgent.includes('Opera/'):
      return BROWSER.OPERA;

    default:
      return BROWSER.UNKNOWN;
  }
}

export default detectUserAgent;
