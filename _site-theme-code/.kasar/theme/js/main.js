/* ****************************************************************************
 * This script makes initializations.
 *
 * ************************************************************************** */
// ESLint declarations
/* global jQuery, isThisBrowserIE, addMessageToAlertBanner */
/* eslint strict: ["error", "function"] */
/* eslint one-var: 0, semi-style: 0, no-var: 0, prefer-arrow-callback: 0 */
(function($) {
  'use strict';

  // -- Service Worker Script:
  var sw = '/sw.js';

  $(document).ready(function() {
    var date
      , year
      , attr
      , text
      , alert
      ;

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
    date = new Date();
    year = date.getFullYear();
    attr = $('meta[name=copyright]').attr('content');
    $('meta[name=copyright]').attr('content', attr.replace('{{copyright:year}}', year));
    text = $('footer p.copyright').text();
    $('footer p.copyright').text(text.replace('{{copyright:year}}', year));

    // -- Add a banner alert if needed:
    if (isThisBrowserIE()) {
      alert = 'You are using an <strong>outdated</strong> browser. Your browser is not compatible with xxx. Please upgrade it!';
      // addMessageToAlertBanner(alert);
    }

    // -- Start highlight script:
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });

    // -- Start the smooth scrolling:
    $('body').smoothScrolling({ buttons: '.nav' }, function() {
      //
    });

    //
  });
}(jQuery));
