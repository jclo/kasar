/* ****************************************************************************
 * This script makes initializations.
 *
 * ************************************************************************** */
// ESLint declarations
/* global PicoQ */
/* eslint-disable strict, no-console, no-underscore-dangle */
(function($) {
  //
  // -- Service Worker Script:
  const sw = '/sw.js';

  $().DOMready(() => {
    // -- Private Function(s) --------------------------------------------------

    /**
     * Starts the service worker.
     */
    function _startServiceWorker() {
      if ('serviceWorker-xxxx' in navigator) {
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
    }

    /**
     * Update the copyright date in the head and footer sections.
     */
    function _setCopyright() {
      const date = new Date();
      const year = date.getFullYear();
      const attr = $('meta[name=copyright]').attr('content');
      $('meta[name=copyright]').attr('content', attr.replace('{{copyright:year}}', year));
      const text = $('footer p.copyright').text();
      $('footer p.copyright').text(text.replace('{{copyright:year}}', year));
    }


    // -- Where the script starts ----------------------------------------------
    _startServiceWorker();
    _setCopyright();
  });
}(PicoQ));

/* eslint-disable strict, no-console, no-underscore-dangle */
