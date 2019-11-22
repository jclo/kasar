/* ****************************************************************************
 * This script allows the user to add an alert banner on top of the header.
 *
 * This script provides two functions that are in the window global space
 * to be called by another script.
 * ************************************************************************** */
// ESLint declarations
/* global */
/* eslint strict: ["error", "function"] */
/* eslint one-var: 0, no-var: 0, semi-style: 0 */

/**
 * Detects if the browser is IE.
 *
 * If the browser is IE, it returns a string with 'IE' and the version number.
 * Otherwise, it returns false.
 */
function isThisBrowserIE() {
  'use strict';

  var ua = window.navigator.userAgent
    , msie
    , trident
    , rv
    ;

  // Up to IE 10, an IE agent looks like:
  // Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)
  msie = ua.indexOf('MSIE');
  if (msie > 0) {
    // IE 10 or older => return version number
    return `IE ${parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)}`;
  }

  // IE 11 agent looks like:
  // Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
  trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    rv = ua.indexOf('rv:');
    return `IE ${parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)}`;
  }

  return false;
}

/**
 * Adds an alert message.
 *
 * It adds the passed-in message to the alter banner defined on the top of
 * the header by '<div class="altertbanner"></div>'.
 */
function addMessageToAlertBanner(alert) {
  'use strict';

  var el = document.querySelector('header .banneralert');
  if (el) {
    el.classList.add('active');
    el.innerHTML = alert;
  }
}
