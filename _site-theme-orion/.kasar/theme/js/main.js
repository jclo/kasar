/* ****************************************************************************
 * This script makes initializations.
 *
 * ************************************************************************** */
// ESLint declarations
/* global jQuery */
/* eslint one-var: 0, strict: ["error", "function"], semi-style: 0
  no-console: 0 */
(function($) {
  'use strict';

  // -- Service Worker Script:
  const sw = '/sw.js';

  $(document).ready(() => {
    // -- Start the Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(sw)
        .then((/* reg */) => {
          console.log('Service Worker registered ...');
        })
        .catch((/* err */) => {
          console.log('Service Worker NOT registered ...');
        });
    } else {
      console.log('Service Worker NOT supported ...');
    }

    // -- Update the copyright date in the head and footer sections:
    const date = new Date();
    const year = date.getFullYear();
    const attr = $('meta[name=copyright]').attr('content');
    $('meta[name=copyright]').attr('content', attr.replace('{{copyright:year}}', year));
    const text = $('footer p.copyright').text();
    $('footer p.copyright').text(text.replace('{{copyright:year}}', year));

    // -- Start the highlight script:
    // none,

    // -- Start the smooth scrolling:
    $('body').smoothScrolling({ buttons: '.nav' }, () => {
      //
    });
  });
}(jQuery));
