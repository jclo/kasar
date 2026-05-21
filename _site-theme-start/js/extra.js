/* ****************************************************************************
 * This script manages ...
 *
 * ************************************************************************** */
// ESLint declarations
/* global PicoQ, hljs, tarteaucitron, window */
/* - */
(function($) {
  const G4ID = null; // 'G-XXXXXXXXX';

  $().DOMready(() => {
    // -- Private Function(s) --------------------------------------------------

    /**
     * Starts the highlight script to highlight the code inside the text.
     */
    function _startHighlightScript() {
      hljs.highlightAll();
    }

    /**
     * Initialiizes tarte au citron cookie manager.
     */
    function _tarteInit() {
      if (window.tarteaucitron && G4ID) {
        tarteaucitron.init({
          "privacyUrl": "", /* Privacy policy url */
          "bodyPosition": "bottom", /* or top to bring it as first element for accessibility */

          "hashtag": "#tarteaucitron", /* Open the panel with this hashtag */
          "cookieName": "tarteaucitron", /* Cookie name */

          "orientation": "middle", /* Banner position (top - bottom - middle - popup) */

          "groupServices": false, /* Group services by category */
          "showDetailsOnClick": true, /* Click to expand the description */
          "serviceDefaultState": "wait", /* Default state (true - wait - false) */

          "showAlertSmall": false, /* Show the small banner on bottom right */
          "cookieslist": false, /* Show the cookie list */

          "showIcon": false, /* Show cookie icon to manage cookies */
          // "iconSrc": "", /* Optional: URL or base64 encoded image */
          "iconPosition": "BottomRight", /* Position of the icon between BottomRight, BottomLeft, TopRight and TopLeft */

          "adblocker": false, /* Show a Warning if an adblocker is detected */

          "DenyAllCta": true, /* Show the deny all button */
          "AcceptAllCta": true, /* Show the accept all button when highPrivacy on */
          "highPrivacy": true, /* HIGHLY RECOMMANDED Disable auto consent */

          "handleBrowserDNTRequest": false, /* If Do Not Track == 1, disallow all */

          "removeCredit": false, /* Remove credit link */
          "moreInfoLink": true, /* Show more info link */
          "useExternalCss": false, /* If false, the tarteaucitron.css file will be loaded */
          "useExternalJs": false, /* If false, the tarteaucitron.services.js file will be loaded */

          // "cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for subdomain website */

          "readmoreLink": "", /* Change the default readmore link pointing to tarteaucitron.io */

          "mandatory": true, /* Show a message about mandatory cookies */
          "mandatoryCta": true, /* Show the disabled accept button when mandatory on */

          // "customCloserId": "" /* Optional a11y: Custom element ID used to open the panel */
        });
      }
    }

    /**
     * Sets cookies.
     */
    function _setCookies() {
      if (window.tarteaucitron && G4ID) {
        tarteaucitron.user.gtagUa = G4ID;
        // tarteaucitron.user.gtagCrossdomain = ['example.com', 'example2.com'];
        tarteaucitron.user.gtagMore = function() { /* add here your optionnal gtag() */ };
        (tarteaucitron.job = tarteaucitron.job || []).push('gtag');
      }
    }


    // -- Where the script starts ----------------------------------------------
    _startHighlightScript();
    _tarteInit();
    _setCookies();
  });
}(PicoQ));

/* - */
