/** ************************************************************************
 *
 * Defines the App I/F.
 *
 * main.js sets the I/F for the App. This interface allows the user
 * to create, update and destroy the App.
 *
 * main.js is built upon the Prototypal Instantiation pattern. It
 * returns an object by calling its constructor. It doesn't use the new
 * keyword.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Constructor:
 *  . App                         creates the App,
 *
 *
 * Public Methods:
 *  . initialize                  initializes the app object,
 *  . create                      creates the App into the DOM,
 *  . removeChild                 removes a component from  App and DOM,
 *  . destroy                     removes App from the DOM and destroys it,
 *
 *
 *
 * @namespace -
 * @exports   -
 * @author    -
 * @since     0.0.0
 * @version   -
 * ********************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules
import KZlog from '@mobilabs/kzlog';


// -- Local Modules
import config from '../config';
import AppView from './views/main';


// -- Local Constants
const { level } = config.logger
    , log       = KZlog('kapp:app:main', level, false)
    ;


// -- Local Variables
let methods;


// -- Main -----------------------------------------------------------------

/**
 * Creates and returns the App object.
 *
 * @constructor (arg1, arg2, arg3, arg4, arg5,  arg6, arg7)
 * @public
 * @param {Object}          the connected user,
 * @param {Object}          the dictionary,
 * @param {Object}          the config.js of the server,
 * @param {Object}          the sidemenu,
 * @param {String}          the active language or null,
 * @param {String}          the page to load or null,
 * @param {String}          the active theme or null,
 * @returns {Object}        returns the app object,
 * @since 0.0.0
 */
const App = function(whois, i18n, conf, sidemenu, lang, page, theme) {
  const obj = Object.create(methods);
  obj._whois = whois;
  obj._i18n = i18n;
  obj._config = conf;
  obj._sidemenu = sidemenu;
  obj._lang = lang;
  obj._page = page;
  obj._theme = theme;
  obj.initialize();
  return obj;
};


// -- Public Methods -------------------------------------------------------

methods = {

  /**
   * Initializes Auth.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  initialize() {
    this.create();
    return this;
  },

  /**
   * Creates the App into the DOM.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the connected user,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  /* eslint-disable max-len */
  create() {
    if (!this._view) {
      log.trace('creating KApp App ...');
      this._view = AppView(this._whois, this._i18n, this._config, this._sidemenu, this._lang, this._page, this._theme);
    }
    return this;
  },
  /* eslint-enable max-len */

  /**
   * Removes a component from the App and from the DOM.
   *
   * @method (arg1)
   * @public
   * @param {String}        the component id,
   * @returns {Boolean}     returns true if the operation succeeded,
   * @since 0.0.0
   */
  removeChild(id) {
    return this._view.removeChild(id);
  },

  /**
   * Removes the component from the DOM and destroys it.
   * (components, collection, models, views)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  /* eslint-disable no-proto */
  destroy() {
    if (this._view) {
      log.trace('destroying the App (except I/F) ...');
      this._view.destroy();
      Object.getOwnPropertyNames(this._view).forEach((key) => { delete this._view[key]; });
      this._view.__proto__ = {};
      delete this._view;
    }
    return this;
  },
  /* eslint-enable no-proto */
};


// Exports:
export default App;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
