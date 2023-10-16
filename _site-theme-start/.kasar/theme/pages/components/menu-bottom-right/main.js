/** ****************************************************************************
 *
 * Defines the menu at the bottom of the web page.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Overwritten Public Methods:
 *  . render                      returns the XMLString of the component,
 *
 *
 * Specific Public Methods:
 *  . set                         updates the menu,
 *
 *
 *
 * @namespace -
 * @exports   -
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle,
  import/no-extraneous-dependencies */

'use strict';

// -- Vendor Modules
const RView = require('@mobilabs/rview');


// -- Local Modules
const Util = require('../menu/util');


// -- Local Constants


// -- Local Variables


// -- Private Functions --------------------------------------------------------
// none,


// -- Public ---------------------------------------------------------------

const BOTMenu = RView.Component({

  // -- Overwritten Methods ------------------------------------------------

  /**
   * Returns the XMLString of the component.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the state properties,
   * @param {Object}        the optional properties,
   * @returns {XMLString}   returns the XMLString of the component,
   * @since 0.0.0
   */
  render(state/* , props */) {
    return `
      <div class="bottom menu pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list pull-right">
          <!-- bottom menu here -->
          ${state.menu}
        </ul>
      </div><!-- /.bottom menu -->
    `;
  },


  // -- Specific Methods -------------------------------------------------------

  /**
   * Updates the menu.
   *
   * @method (arg1, arg2, arg3, arg4)
   * @public
   * @param {Object}        the website as defined in config,
   * @param {Array}         the menu to build,
   * @param {String}        the active language,
   * @param {String}        the active website page,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  set(website, menu, lang, page) {
    if (menu && menu[lang] && Array.isArray(menu[lang].bottom)) {
      this.$setState({ menu: Util.appendMenu(website, menu[lang].bottom, lang, page) });
    }
    return this;
  },
});


// Exports:
module.exports = BOTMenu;
