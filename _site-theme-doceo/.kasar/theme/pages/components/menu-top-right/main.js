/** ****************************************************************************
 *
 * Defines the menu at the top right of the web page.
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


// -- Public -------------------------------------------------------------------

const TRMenu = RView.Component({

  // -- Overwritten Methods ----------------------------------------------------

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
      <div class="menu pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          <!-- top right menu here -->
          ${state.menu}
        </ul>
      </div><!-- /.top right menu -->
    `;
  },


  // -- Specific Methods -------------------------------------------------------

  /**
   * Updates the menu.
   *
   * @method (arg1, arg2, arg3, arg4, [arg5])
   * @public
   * @param {Object}        the website as defined in config,
   * @param {Array}         the menu to build,
   * @param {String}        the active language,
   * @param {String}        the active website or docsite page,
   * @param {Object}        the docsite,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  set(website, menu, lang, page, docsite) {
    if (menu && menu[lang] && menu[lang].top && Array.isArray(menu[lang].top.right)) {
      this.$setState({ menu: Util.appendMenu(website, menu[lang].top.right, lang, page, docsite) });
    }
    return this;
  },
});


// Exports:
module.exports = TRMenu;
