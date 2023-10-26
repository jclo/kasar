/** ************************************************************************
 *
 * Defines a View.
 *
 * main.js draws the App.
 *
 * main.js extends the Spine.View object. In other words, it creates an
 * object that inherits from the Spine.View object.
 *
 * Private Functions:
 *  . _loadFirstPage              loads the first page from the server,
 *
 *
 * Overwritten Public Methods:
 *  . initialize                  makes the initializations,
 *  . listen                      listens for events,
 *  . render                      renders the View in the DOM,
 *
 *
 * Specific Public Methods:
 *  . setTheme                    sets the light/dark theme,
 *  . removeChild                 removes a component from App and from DOM,
 *  . destroy                     destroys component, collection, model,
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
import Spine from '@mobilabs/spine';
import RView from '@mobilabs/rview';
import KZlog from '@mobilabs/kzlog';


// -- Local Modules
import config from '../../config';
import App from '../components/app/main';
import L from './listen';


// -- Local Constants
const { level }  = config.logger
    , log        = KZlog('kapp:app:views:main', level, false)
    , { anchor } = config
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Loads the first page from the server.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String}          the path of the file on the server,
 * @param {string}          the type of file (json or text),
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _loadFirstPage(that) {
  if (that._sidemenu && that._sidemenu[that._lang]) {
    let menu;
    if (that._page) {
      menu = { name: that._page, lang: that._lang };
    } else {
      menu = that._sidemenu[that._lang][0].children
        ? that._sidemenu[that._lang][0].children[0]
        : that._sidemenu[that._lang][0]
      ;
    }

    // Simulate a request from the sidemenu to load the page:
    that._app.$emit('kapp:from:_shared:components:sidemenu:to:app:contents:views:load:page', {
      menu: `${menu.lang}:${menu.name}`,
      source: '_loadFirstPage',
    });
  }
}
/* eslint-enable no-param-reassign */


// -- Public ---------------------------------------------------------------

const View = Spine.View({

  // -- Overwritten Methods ------------------------------------------------

  /**
   * Makes the initializations.
   * (empty public method - could be overwritten)
   *
   * @method (arg1, arg2, arg3, arg4, arg5, arg6, arg7)
   * @public
   * @param {Object}        the connected user,
   * @param {Object}        the dictionary,
   * @param {Object}        the config.js of the server,
   * @param {Object}        the sidemenu,
   * @param {String}        the active language or null,
   * @param {String}        the page to load or null,
   * @param {String}        the active theme or null,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  initialize(whoiam, i18n, conf, sidemenu, lang, page, theme) {
    log.trace('created the App into the DOM!');
    this._whoiam = whoiam;
    this._i18n = i18n;
    this._config = conf;
    this._sidemenu = sidemenu;
    this._lang = lang || 'en';
    this._page = page;
    this._theme = theme || 'light';

    const app = this.render();
    this._app = app.$getChild('<App />');
    this._app.setTheme(this._theme);
    return this;
  },

  /**
   * Listens for events.
   * (empty public method - could be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  listen() {
    L.start(this);
    _loadFirstPage(this);
    return this;
  },

  /**
  * Renders the Auth App in the DOM.
  * (empty public method - could be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  render() {
    return RView.render({
      el: anchor,
      children: { '<App />': { fn: App, props: { config: this._config, sidemenu: this._sidemenu } } },
      template: `
        <div>
          <App />
        </div>
      `,
    });
  },


  // -- Specific Methods ---------------------------------------------------

  /**
   * Sets the light/dark theme.
   *
   * @method (arg1)
   * @public
   * @param {String}        the requested theme (light or dark),
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  setTheme(theme) {
    this._theme = theme === 'dark' ? theme : 'light';
    this._app.setTheme(this._theme);
    return this;
  },

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
    return this._app.$removeChild(id);
  },

  /**
   * Removes the component from the DOM and destroys it.
   * (components, collection, models)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  destroy() {
    L.stop();
    RView.remove(this._app);
    return this;
  },
});


// Exports:
export default View;

/* eslint-disable one-var, semi-style, no-underscore-dangle */
