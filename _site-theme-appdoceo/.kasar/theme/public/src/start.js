/** ************************************************************************
 *
 * Starts the App.
 *
 *
 * Private Functions:
 *  . _GET                        retrieves data from the server,
 *
 *
 * Public Function:
 *  . KApp                        starts the App,
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ********************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle, no-console */


// -- Vendor Modules
import Spine from '@mobilabs/spine';


// -- Local Modules
import Worker from './worker/main';
import App from './kapp/main';


// -- Local Constants
const config   = './config.json'
    , sidemenu = './sidemenu.json'
    , sw       = './sw.js';


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Retrieves data from the server.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the server url,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _GET(url, type, callback) {
  Spine.fetch(url, type, (err, res) => {
    if (err) {
      document.body.innerHTML = err.statusText;
      throw new Error(err.status);
    } else {
      callback(res);
    }
  });
}


// -- Public ---------------------------------------------------------------

/**
 * Starts KApp.
 *
 * @function (arg1, arg2, arg3)
 * @public
 * @param {String}          the active language or null,
 * @param {String}          the page to load or null,
 * @param {String}          the active theme or null,
 * @returns {}              -,
 * @since 0.0.0
 */
function KApp(lang, page, theme) {
  Worker.start(sw, (err, msg) => {
    if (err) {
      console.log(err);
    } else {
      console.log(msg);
    }

    _GET(config, 'json', (conf) => {
      _GET(sidemenu, 'json', (smenu) => {
        // starts doceo app:
        App(null, null, conf, smenu, lang, page, theme);
      });
    });
  });
}

// Attaches a constant to KApp that provides the version of the lib.
KApp.VERSION = '{{lib:version}}';


// -- Starts
const theme = localStorage.getItem('theme');
// This is an option to reload the active page. If the user forces a page
// to reload, a script at the begining of the html contents, restarts
// the app and specify what page to load. For instannce, this is the begining
// of the "http://<domain>/en/introduction.html" file:
//   . <script>window.location.href="/?page=en:introduction"</script><h1 id="introduction" ...
// The script is removed from the contents when the page is
// loaded (see kapp/app/views/listen.js/_listenContents)
const urlParams = new URLSearchParams(window.location.search);
const p = urlParams.get('page');
const [lang, page] = p ? p.split(':') : [null, null];

KApp(lang, page, theme);


// -- Export
export default KApp;

/* eslint-enable one-var, semi-style, no-underscore-dangle, no-console */
