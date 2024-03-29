// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules
const kasar = require('../scripts/libs/kasar')
    ;


// -- Local modules
const VDOM        = require('./lib/vdom')
    , App         = require('./components/app/app')
    , themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    , U           = require('./lib/util')
    ;


// -- Local constants
const { product }    = config
    , kversion       = kasar.VERSION
    , { theme }      = themeconfig
    , { GA4 }        = themeconfig
    , { KA }         = themeconfig
    , { Axeptio }    = themeconfig
    , { topscripts } = config
    , { scripts }    = config
    , { google }     = config
    , { kiwi }       = config
    , { axeptio }    = config
    ;


// -- Local variables


// -- Public Function(s) -------------------------------------------------------

/**
 * Creates the web page in a virtual DOM and returns its HTML representation.
 *
 * @function (arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9)
 * @public
 * @param {Object}          the website pages,
 * @param {Object}          the docsite pages,
 * @param {String}          the language,
 * @param {String}          the active page,
 * @param {String}          the HTML contents of the web/doc page,
 * @param {String}          the normalyze style to insert in the head of the web page,
 * @param {Object}          params specific to the active page,
 * @param {Object}          the menus,
 * @param {Array}           the documentation menu,
 * @returns {String}        returns the HTML representation of the generated web page,
 * @since 0.0.0
 */
function createPage(website, lang, page, content, norm, params, menu, docsite, docmenu) {
  // Creates the DOM & adds the DOM head.
  const vdom = VDOM(product, kversion, theme, lang);
  vdom.addHead(params.title, params.canonical, params.description, norm);

  // Creates an App linked with this virtual DOM and fills the body.
  // (the virtual dom is attached to Node.js global window and document variables.
  // it is by this way that App can access to the vdom. The function creating this
  // link is createVDOM in './lib/vdom.js')
  const app = App();
  app.configure(website, docsite, lang, page, params, menu, docmenu);
  app.fillContent(website, docsite, lang, page, params, content, docmenu);

  // Completes the DOM with the scripts.
  vdom.appendScripts(scripts);
  vdom.appendTopScripts(topscripts);
  if (google && google.sitega4id) vdom.appendTracker(GA4, google.sitega4id, 'GA4');
  if (kiwi && kiwi.siteid) vdom.appendTracker(KA, kiwi.siteid);
  if (axeptio && axeptio.siteid) vdom.appendTracker(Axeptio, axeptio.siteid);

  // Serializes the generated DOM and returns it.
  vdom.vdom.window.document.head.innerHTML = U.minify(vdom.vdom.window.document.head.innerHTML);
  vdom.vdom.window.document.body.innerHTML = U.minify(vdom.vdom.window.document.body.innerHTML);
  return vdom.serialize();
}


// -- Export
module.exports = createPage;
