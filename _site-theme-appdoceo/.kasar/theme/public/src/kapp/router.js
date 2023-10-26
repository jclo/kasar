/** ************************************************************************
 *
 * Defines the router.
 *
 * Router acts as the controller for the web app. It defines the routes and
 * sets the actions when a route is selected.
 *
 * router.js extends the Spine.Router object. In other words, it creates an
 * object that inherits from the Spine.Router object.
 *
 * Private Functions:
 *  . _startAbortSession          starts a timer for aborting the current session,
 *  . _stopAbortSession           clears the abort session timer,
 *
 *
 * Overwritten Public Methods:
 *  . initialize                  makes the initializations,
 *  . listen                      listens for bus messages,
 *  . execute                     calls the matching route,
 *
 *
 * Public Specific Methods:
 *  . home                        displays the home page,
 *  . things                      displays the things page,
 *  . askForNotifications         asks permission to receive notifications,
 *  . logout                      processes a logout,
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
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules
import Spine from '@mobilabs/spine';
import KZlog from '@mobilabs/kzlog';


// -- Local Modules
import config from './config';
import App from './app/main';


// -- Local Constants
const /* ABORT_MSG           = 'Your session has expired after 15 minutes of inactivity!'
    , SERVER_LOGOUT_MSG   = 'You have been disconnected by the server!'
 , */ ABORT_SESSION_DELAY = 1000 * 60 * 15
    , { level }           = config.logger
    , log                 = KZlog('kapp:router', level, false)
    // , { exportname }      = config
    ;


// -- Local Variables
let app
  , sessionTimer
  ;


// -- Private Functions ----------------------------------------------------

/**
 * Starts a timer for aborting the current session.
 * (after a period of inactivity)
 *
 * @method (arg1)
 * @public
 * @param {Object}        the router object,
 * @returns {}            -,
 * @since 0.0.0
 */
function _startAbortSession(/* that */) {
  sessionTimer = setTimeout(() => {
    // that.logout(ABORT_MSG);
  }, ABORT_SESSION_DELAY);
}

/**
 * Clears the abort session timer.
 *
 * @method (arg1)
 * @public
 * @param {}              -,
 * @returns {}            -,
 * @since 0.0.0
 */
function _stopAbortSession() {
  clearTimeout(sessionTimer);
}


// -- Public  --------------------------------------------------------------

const Router = Spine.Router({
/**
 * Sets the active App routes.
 */
  routes: {
    '': 'default',
    logout: 'logout',
  },


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
  initialize(...args) {
    const [me, i18n, conf, sidemenu, lang, page, theme] = args;
    log.trace('starting to initialize the router ...');
    Spine.History.start();
    _startAbortSession(this);
    app = App(me, i18n, conf, sidemenu, lang, page, theme);
  },

  /**
   * Listens for bus messages.
   * (empty public method - could be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  listen() {
    /**
     * Listens messages coming from ...
     *
     */
    Spine.Radio.on('<component>:from:<source_subcomponent:to:<destination>:<action>', (/* payload */) => {
      //
    });
    return this;
  },

  /**
   * Calls the matching route.
   * (public method - could be overwritten)
   *
   * @method (arg1)
   * @public
   * @param {Function}      the function to call,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  execute(callback, ...args) {
    _stopAbortSession();
    _startAbortSession(this);
    if (callback) callback.apply(this, args);
    return this;
  },


  // -- Specific Methods ---------------------------------------------------

  /**
   * Processes nothing.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  default() {
    return this;
  },

  /**
   * Processes a logout.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  logout(msg) {
    _stopAbortSession();
    log.trace(msg || '');
    log.trace('logging out ...');
    log.trace('disconnecting the App from the server ...');
    this.navigate('');
    Spine.History.stop();
    this.stop();
    app.destroy();
    // window[exportname].logout(app, msg);
    return this;
  },
});


// -- Export
export default Router;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
