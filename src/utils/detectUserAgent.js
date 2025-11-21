/** @returns {import("../index.d.js").UserAgent} */
function detectUserAgent() {
  const userAgent = window.navigator.userAgent;
  switch (true) {
    case userAgent.includes('Firefox/') && !userAgent.includes('Seamonkey/'):
      return 'firefox';

    case userAgent.includes('Seamonkey/'):
      return 'seamonkey';

    case userAgent.includes('Chrome/') &&
      !userAgent.includes('Chromium/') &&
      !userAgent.includes('Edg/'):
      return 'chrome';

    case userAgent.includes('Chromium/'):
      return 'chromium';

    case userAgent.includes('Safari/') &&
      !userAgent.includes('Chrome/') &&
      !userAgent.includes('Chromium/'):
      return 'safari';

    case userAgent.includes('OPR/'):
      return 'opera';

    case userAgent.includes('Opera/'):
      return 'opera';

    default:
      return 'unknown';
  }
}

export default detectUserAgent;
