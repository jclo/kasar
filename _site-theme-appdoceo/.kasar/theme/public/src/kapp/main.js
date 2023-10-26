/** ************************************************************************
 *
 * Starts KApp App.
 *
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Function:
 *  . App                         starts KApp App,
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
/* eslint-disable one-var, semi-style, no-console, no-console, no-restricted-syntax, guard-for-in */


// -- Vendor Modules
import RView from '@mobilabs/rview';
import Messenger from '@mobilabs/messenger';
import KZlog from '@mobilabs/kzlog';


// -- Local Modules
import config from './config';
import Router from './router';


// -- Local Constants
const { level } = config.logger
    , log       = KZlog('kapp:main', level, false)
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------
// none,


// -- Public ---------------------------------------------------------------

/**
 * Starts KApp App.
 *
 * @function (arg1, arg2, arg3, arg4, arg5, arg6, arg7)
 * @public
 * @param {Object}          the connected user,
 * @param {Object}          the dictionary,
 * @param {Object}          the config.js of the server,
 * @param {Object}          the sidemenu,
 * @param {String}          the active language or null,
 * @param {String}          the page to load or null,
 * @param {String}          the active theme or null,
 * @returns {}              -,
 * @since 0.0.0
 */
function App(whoiam, i18n, conf, sidemenu, lang, page, theme) {
  log.trace('starting KApp App Router & Spine history ...');

  // Attaches required plugins to RView:
  RView.plugin({ messenger: Messenger });
  Router(whoiam, i18n, conf, sidemenu, lang, page, theme);
}


// -- Export
export default App;

/* eslint-enable one-var, semi-style, no-console, no-console, no-restricted-syntax, guard-for-in */
