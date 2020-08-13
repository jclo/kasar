// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules
const kasar = require('../tasks/_kasar')
    ;


// -- Local modules
const VDOM        = require('./lib/vdom')
    , App         = require('./components/app/app')
    , themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    ;


// -- Local constants
const { product } = config
    , kversion    = kasar.VERSION
    , { theme }   = themeconfig
    , { GA }      = themeconfig
    , { KA }      = themeconfig
    , { scripts } = config
    , { google }  = config
    , { kiwi }    = config
    , { menu: { mobile } } = config
    ;


// -- Local variables


// -- Public Function(s) -------------------------------------------------------

/**
 * Creates the web page in a virtual DOM and returns its HTML representation.
 *
 * @function (arg1, arg2, arg3, arg4, arg5, arg6)
 * @public
 * @param {String}          the name of the web page (home, contact, etc.),
 * @param {String}          the title of the web page,
 * @param {String}          the description of the web page,
 * @param {String}          the HTML contents of the web page,
 * @param {String}          the normalyze style to insert in the head of the web page,
 * @param {Array}           a special sidemenu if any,
 * @returns {String}        returns the HTML representation of the generated web page,
 * @since 0.0.0
 */
function createPage(pagename, title, description, content, norm, sidemenu) {
  // Creates the DOM & adds the DOM head.
  const vdom = VDOM(product, kversion, theme);
  vdom.addHead(title, description, norm);

  // Creates an App linked with this virtual DOM and fills the body.
  // (the virtual dom is attached to Node.js global window and document variables.
  // it is by this way that App can access to the vdom. The function creating this
  // link is createVDOM in './lib/vdom.js')
  const app = App();
  app.configure(pagename);
  app.fillContent(pagename, content, sidemenu, mobile);

  // Completes the DOM with the scripts.
  vdom.appendScripts(scripts);
  if (google && google.siteid) vdom.appendTracker(GA, google.siteid);
  if (kiwi && kiwi.siteid) vdom.appendTracker(KA, kiwi.siteid);

  // Serializes the generated DOM and returns it.
  return vdom.serialize();
}


// -- Export
module.exports = createPage;
