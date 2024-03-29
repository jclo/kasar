/** ****************************************************************************
 *
 * Defines the Header section of the web page.
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
 *  . set                         sets home link,
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
/* eslint-disable one-var, semi-style, import/no-extraneous-dependencies */

'use strict';

// -- Node modules
const RView = require('@mobilabs/rview')
    ;


// -- Local modules
const TLMenu = require('../menus/menu-top-left/main')
    , TRMenu = require('../menus/menu-top-right/main')
    ;


// -- Local constants


// -- Local variables


// -- Private Functions --------------------------------------------------------
// none,


// -- Public -------------------------------------------------------------------

const Header = RView.Component({

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
    this.children = { '<TLMenu />': TLMenu, '<TRMenu />': TRMenu };

    return `
      <header class="navbar-fixed-top">
        <div class="navbar">
          <div class="container">
            <div class="logo menu pure-menu pure-menu-horizontal">
              <a class="pure-menu-heading" href="${state.home}">
                <span class="header-logo"></span>
              </a>
            </div>
            <div class="top-left-menu"><TLMenu /></div>
            <div class="top-right-menu"><TRMenu /></div>
            <div class="mobilemenu-button">
              <div><span class="mobilemenu-icon"></span></div>
            </div>
          </div><!-- /.container -->
        </div><!-- /. navbar -->
      </header><!-- /.header -->
    `;
  },


  // -- Specific Methods -------------------------------------------------------

  /**
   * Sets home link.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the home properties,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  set(home) {
    this.$setState({ home: home && home.link ? home.link : '#' });
    return this;
  },
});


// -- Export
module.exports = Header;
