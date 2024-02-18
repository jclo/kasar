// ESLint declarations
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0,
  import/no-extraneous-dependencies: 0 */

'use strict';

// -- Node modules
const { JSDOM } = require('jsdom')
    ;


// -- Local modules
const themeconfig = require('../../../theme-config')
    , config      = require('../../../../config')
    ;


// -- Local constants
const { fonts }    = themeconfig
    , { google }   = config
    , { company }  = config
    , { basepath } = config
    ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Returns the HTML Page template.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Object}          the reference to the product built,
 * @param {String}          the version of Kasar that created the product,
 * @param {Object}          the reference to the theme used to build the product,
 * @param {String}          the language,
 * @returns {String}        returns the DOM template,
 * @since 0.0.0
 */
function _getHTMLTemplate(product, kversion, theme, lang) {
  return `
    <!doctype html>
    <!-- ${product.name} v${product.version} built with Kasar ${kversion} and the theme ${theme.name} v${theme.version} -->
    <!-- based on HTML5 boilerplate v9.0.0 -->
    <html class="no-js" lang="${lang || ''}" data-theme="light">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title></title>

        <link rel="canonical" href="">
        <link rel="stylesheet" href="{{path:fonts}}">
        <link rel="stylesheet" href="${basepath}css/style.css">
        <link id="highlight-color-theme" rel="stylesheet" href="${basepath}css/fake.css">

        <meta name="verify-v1" content="-">
        <meta name="description" content="">
        <meta name="${company.name}" content="${company.description}" />
        <meta name="copyright" content="${company.copyright}" />

        <!-- Open Graph Protocol markup -->
        <meta property="og:title" content="">
        <meta property="og:type" content="">
        <meta property="og:url" content="">
        <meta property="og:image" content="">

        <!-- Place favicon (icon-32x32.png) in the root directory -->
        <link rel="icon" type="image/png" sizes="32x32" href="${basepath}img/icons/icon-32x32.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="${basepath}img/icons/icon-192x192.png">

        <!-- PWA manifest, Web manifest -->
        <link rel="manifest" href="${basepath}manifest.json">
        <link rel="manifest" href="${basepath}site.webmanifest">

        <meta name="theme-color" content="#fafafa">
      </head>
      <body>
        <!-- Warning message if Javascript isn't enabled -->
        <noscript><p style="text-align:center;padding-top:3em;">We are sorry, but this website doesn't work properly without JavaScript enabled!</p></noscript>

        <!-- Add your site or application content here -->
        <div id="kasarapp"></div>
      </body>
    </html>
  `;
}

/**
 * Inserts the tracker script.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Object}          the VDOM object,
 * @param {Object}          the tracker,
 * @param {String}          the tracker id,
 * @returns {}              -,
 * @since 0.0.0
 */
function _appendTracker(vdom, tracker, id, type) {
  if (tracker && typeof tracker.xmlString === 'string' && type === 'GA4') {
    const script = tracker.xmlString.replace(/{{tracker:siteid}}/g, id);
    vdom.window.document.getElementsByTagName('head')[0].insertAdjacentHTML('afterbegin', script);
    return;
  }

  if (tracker && typeof tracker.xmlString === 'string') {
    const html = tracker.xmlString.replace(/{{tracker:siteid}}/g, id);
    vdom.window.document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', html);
  }
}

/**
 * Appends the script to the end of the body section.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the VDOM object,
 * @param {Array}           the list of scripts,
 * @returns {}              -,
 * @since 0.0.0
 */
function _appendScripts(vdom, scripts) {
  const node = vdom.window.document.getElementsByTagName('body')[0];

  for (let i = 0; i < scripts.length; i++) {
    const script = vdom.window.document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', scripts[i]);
    node.appendChild(script);
  }
}

/**
 * Appends scripts to the top of the head section.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the VDOM object,
 * @param {Array}           the list of scripts,
 * @returns {}              -,
 * @since 0.0.0
 */
function _appendTopScripts(vdom, scripts) {
  const node = vdom.window.document.getElementsByTagName('head')[0];

  for (let i = scripts.length - 1; i > -1; i--) {
    const script = vdom.window.document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', scripts[i]);
    node.appendChild(script);
    node.insertBefore(script, node.firstChild);
  }
}

/**
 * Adds the normalize defined the the HTML5 boilerplate.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the VDOM object,
 * @param {String}          the normalize css,
 * @param {String}          the tracker id,
 * @returns {}              -,
 * @since 0.0.0
 */
// function _insertNormalize(vdom, norm) {
//   const old = vdom.window.document.querySelector('style')
//       , style = vdom.window.document.createElement('style')
//       ;

//   style.setAttribute('type', 'text/css');
//   style.innerHTML = norm;

//   const parent = old.parentNode;
//   parent.insertBefore(style, old);
//   parent.removeChild(old);
// }

/**
 * Sets the url of the server supplying the fonts.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the VDOM object,
 * @param {String}          the url,
 * @returns {}              -,
 * @since 0.0.0
 */
function _setFontUrl(vdom, url) {
  const el = vdom.window.document.querySelectorAll('link[rel="stylesheet"]');
  el[0].setAttribute('href', url || '');
}

/**
 * Sets the description meta tag.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the VDOM object,
 * @param {String}          the company description,
 * @returns {}              -,
 * @since 0.0.0
 */
function _setDescription(vdom, description) {
  vdom.window.document
    .querySelector('meta[name="description"]')
    .setAttribute('content', description)
  ;
}

/**
 * Sets the Google's meta tag.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the VDOM object,
 * @param {String}          the google identification string,
 * @returns {}              -,
 * @since 0.0.0
 */
function _setGoogleVerify(vdom, g) {
  if (g && g.verify && g.verify.v1) {
    vdom.window.document
      .querySelector('meta[name="verify-v1"]')
      .setAttribute('content', g.verify.v1)
    ;
  }
}

/**
 * Adds or removes canonical link.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the VDOM object,
 * @param {String/Null}     the canonical link or null,
 * @returns {}              -,
 * @since 0.0.0
 */
function _setCanonical(vdom, canonical) {
  const el = vdom.window.document.querySelector('link[rel="canonical"]');
  if (canonical) {
    el.setAttribute('href', canonical);
    return;
  }
  el.remove();
}

/**
 * Sets the page title.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the VDOM object,
 * @param {String}          the page title,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _setTitle(vdom, title) {
  vdom.window.document.title = title;
}
/* eslint-enable no-param-reassign */

/**
 * Returns the created DOM.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Object}          the reference to the product built,
 * @param {String}          the version of Kasar that created the product,
 * @param {Object}          the reference to the theme used to build the product,
 * @param {String}          the language,
 * @returns {String}        returns the DOM,
 * @since 0.0.0
 */
function _createVDOM(product, kversion, theme, lang) {
  const template = _getHTMLTemplate(product, kversion, theme, lang)
      , vdom = new JSDOM(template)
      ;

  // Attaches this vdom to a global Node.js window.
  global.window = vdom.window;
  global.document = vdom.window.document;
  global.navigator = { userAgent: 'node.js' };
  global.DOMParser = vdom.window.DOMParser;
  return vdom;
}


// -- Public -------------------------------------------------------------------

/**
 * Create the virtual DOM.
 *
 * @constructor (arg1, arg2, arg3, arg4)
 * @public
 * @param {Object}          the reference to the product built,
 * @param {String}          the version of Kasar that created the product,
 * @param {Object}          the reference to the theme used to build the product,
 * @param {String}          the language,
 * @returns {Object}        returns the create object,
 * @since 0.0.0
 */
function VDOM(product, kversion, theme, lang) {
  /* eslint-disable-next-line no-use-before-define */
  const obj = Object.create(methods);
  obj.vdom = _createVDOM(product, kversion, theme, lang);
  return obj;
}


const methods = {

  /**
   * Creates and fills the DOM head.
   *
   * @method (arg1, arg2, arg3, arg4)
   * @public
   * @param {String}        the title of the page,
   * @param {String/Null}   the canonical link or null,
   * @param {String}        the description of the page,
   * @param {String}        the normalize css style,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  addHead(title, canonical, description/* , norm */) {
    _setTitle(this.vdom, title);
    _setCanonical(this.vdom, canonical);
    _setGoogleVerify(this.vdom, google);
    _setDescription(this.vdom, description);
    _setFontUrl(this.vdom, fonts.remote);
    // _insertNormalize(this.vdom, norm);
    return this;
  },

  /**
   * Inserts js libraies in the head section.
   *
   * @method (arg1)
   * @public
   * @param {Array}         the list of js librairies,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  appendTopScripts(scripts) {
    _appendTopScripts(this.vdom, scripts);
    return this;
  },

  /**
   * Inserts js libraries.
   *
   * @method (arg1)
   * @public
   * @param {Array}         the list of js librairies,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  appendScripts(scripts) {
    _appendScripts(this.vdom, scripts);
    return this;
  },

  /**
   * Inserts the tracker script.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {Object}        the tracker,
   * @param {String}        the tracker id,
   * @param {String}        if Google GA4,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  appendTracker(tracker, id, type) {
    _appendTracker(this.vdom, tracker, id, type);
    return this;
  },

  /**
   * Returns a string representation of the DOM.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {String}      returns DOM,
   * @since 0.0.0
   */
  serialize() {
    return this.vdom.serialize();
  },
};


// -- Export the constructor
module.exports = VDOM;
