// ESLint declarations
/* eslint one-var: 0, semi-style: 0, import/no-extraneous-dependencies: 0 */

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
 * Returns the DOM template.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the reference to the product built,
 * @param {String}          the version of Kasar that created the product,
 * @param {Object}          the reference to the theme used to build the product,
 * @returns {String}        returns the DOM template,
 * @since 0.0.0
 */
function getDOMTemplate(product, kversion, theme) {
  const T =  `
    <!doctype html>
    <!-- {{product:name}} v{{product:version}} built with Kasar {{kasar:release}} and the theme {{kasar:theme.name}} v{{kasar:theme.version}} -->
    <!-- based on HTML5 boilerplate v7.1.0 -->
    <html class="no-js" lang=""><head></head><body></body></html>`;

  const t = T.replace(/{{product:name}}/, product.name)
    .replace(/{{product:version}}/, product.version)
    .replace(/{{kasar:release}}/, kversion)
    .replace(/{{kasar:theme.name}}/, theme.name)
    .replace(/{{kasar:theme.version}}/, theme.version)
  ;
  return t;
}

/**
 * Returns the head representation of the DOM.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {Array}         returns the head representation of the DOM,
 * @since 0.0.0
 */
/* eslint-disable object-curly-newline */
function getDOMHead() {
  return [
    { tag: 'meta', charset: 'utf-8' },
    { tag: 'title' },
    { tag: 'meta', name: 'verify-v1', content: '...' },
    { tag: 'meta', name: 'description', content: '...' },
    { tag: 'meta', name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { tag: 'meta', name: 'ccorp', content: '...' },
    { tag: 'meta', name: 'copyright', content: '{{head:copyright}}' },

    { tag: 'link', rel: 'manifest', href: 'site.webmanifest' },
    { tag: 'link', rel: 'apple-touch-icon', href: 'icon.png' },

    // Place favicon.ico in the root directory
    { tag: 'link', rel: 'shortcut icon', href: '{{path:root}}img/favicon.ico', type: 'image/x-icon' },
    { tag: 'style', type: 'text/css' },
    { tag: 'link', rel: 'stylesheet', href: '{{path:fonts}}' },
    { tag: 'link', rel: 'stylesheet', href: '{{path:root}}css/style.css' },
    { tag: 'meta', name: 'theme-color', content: '#fafafa' },
  ];
}
/* eslint-enable object-curly-newline */

/**
 * Returns the created DOM.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the reference to the product built,
 * @param {String}          the version of Kasar that created the product,
 * @param {Object}          the reference to the theme used to build the product,
 * @returns {String}        returns the DOM,
 * @since 0.0.0
 */
function createVDOM(product, kversion, theme) {
  const template = getDOMTemplate(product, kversion, theme)
      , vdom = new JSDOM(template)
      ;

  // Attaches this vdom to a global Node.js window.
  global.window = vdom.window;
  global.document = vdom.window.document;
  global.navigator = { userAgent: 'node.js' };
  return vdom;
}

/**
 * Adds the head to the DOM.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function createHead() {
  const HEADT = getDOMHead();
  for (let i = 0; i < HEADT.length; i++) {
    const keys = Object.keys(HEADT[i]);
    const tag = document.createElement(HEADT[i].tag);
    for (let j = 0; j < keys.length; j++) {
      if (j > 0) {
        tag.setAttribute([keys[j]], HEADT[i][keys[j]]);
      }
    }
    document.getElementsByTagName('head')[0].appendChild(tag);
  }
}


// -- Public -------------------------------------------------------------------

/**
 * Create the virtual DOM.
 *
 * @constructor ()
 * @public
 * @param {}                -,
 * @returns {Object}        returns the create object,
 * @since 0.0.0
 */
function VDOM(product, kversion, theme) {
  /* eslint-disable-next-line no-use-before-define */
  const obj = Object.create(methods);
  obj.vdom = createVDOM(product, kversion, theme);
  return obj;
}


const methods = {

  /**
   * Adds a head to the DOM.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  createHead() {
    createHead();
    return this;
  },

  /**
   * Adds a title to the DOM.
   *
   * @method (arg1)
   * @public
   * @param {String}        the title,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  updateTitle(title) {
    document.title = title;
    return this;
  },

  /**
   * Updates the Google's meta tag.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the google config,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  updateGoogleVerify(g) {
    if (g && g.verify && g.verify.v1) {
      document
        .querySelector('meta[name="verify-v1"]')
        .setAttribute('content', g.verify.v1)
      ;
    }
    return this;
  },

  /**
   * Updates the description meta tag.
   *
   * @method (arg1)
   * @public
   * @param {String}        the new content,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  updateDescription(desc) {
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', desc)
    ;
    return this;
  },

  /**
   * Updates the company meta tag.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the company name,
   * @param {String}        the company description,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  updateCompany(corp, desc) {
    const el = document.querySelector('meta[name="ccorp"]');
    el.setAttribute('name', corp);
    el.setAttribute('content', desc);
    return this;
  },

  /**
   * Updates the company copyright.
   *
   * @method (arg1)
   * @public
   * @param {String}        the company name,
   * @param {String}        the company description,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  updateCopyright(copyright) {
    const el = document.querySelector('meta[name="copyright"]');
    el.setAttribute('content', copyright);
    return this;
  },

  /**
   * Updates the favicon path.
   *
   * Nota:
   * By default, the path is at the root level. This method allows to set a
   * different path value.
   * @method (arg1)
   * @public
   * @param {String}        the path,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  updateFaviconPath(path) {
    document
      .querySelector('link[rel="shortcut icon"]')
      .setAttribute('href', `${path}img/favicon.ico`)
    ;
    return this;
  },

  /**
   * Updates the url of the server supplying the fonts.
   *
   * @method (arg1)
   * @public
   * @param {String}        the url,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  updateFontUrl(url) {
    const el = document.querySelectorAll('link[rel="stylesheet"]');
    el[0].setAttribute('href', url);
    return this;
  },

  /**
   * Updates the path of the css file.
   * (same reason as for the favicon)
   *
   * @method (arg1)
   * @public
   * @param {String}        the url,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  updateCSSPath(path) {
    const el = document.querySelectorAll('link[rel="stylesheet"]');
    el[1].setAttribute('href', `${path}css/style.css`);
    return this;
  },

  /**
   * Adds the normalize defined the the HTML5 boilerplate.
   *
   * @method (arg1)
   * @public
   * @param {String}        the normalize css,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  addNormalize(norm) {
    const old = document.querySelector('style')
        , style = document.createElement('style')
        ;

    style.setAttribute('type', 'text/css');
    style.innerHTML = norm;

    const parent = old.parentNode;
    parent.insertBefore(style, old);
    parent.removeChild(old);
    return this;
  },

  /**
   * Creates and fills the DOM head.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {String}        the title of the page,
   * @param {String}        the description of the page,
   * @param {String}        the normalize css style,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  addHead(title, description, norm) {
    this
      .createHead()
      .updateTitle(title)
      .updateGoogleVerify(google)
      .updateDescription(description)
      .updateCompany(company.name, company.description)
      .updateCopyright(company.copyright)
      .updateFaviconPath(basepath)
      .updateFontUrl(fonts.remote)
      .updateCSSPath(basepath)
      .addNormalize(norm)
    ;
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
    const node = document.getElementsByTagName('body')[0];

    for (let i = 0; i < scripts.length; i++) {
      const script = document.createElement('script');
      script.setAttribute('src', scripts[i]);
      node.appendChild(script);
    }
    return this;
  },

  /**
   * Inserts the tracker script.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the tracker name,
   * @param {Object}        the tracker config object,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  appendTracker(tracker) {
    if (tracker) {
      const script = document.createElement('script');
      script.text = tracker;
      document.getElementsByTagName('body')[0].appendChild(script);
    }
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
