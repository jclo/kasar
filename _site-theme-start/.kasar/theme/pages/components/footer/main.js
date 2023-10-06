/** ****************************************************************************
 *
 * Defines the Footer section of the web page.
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
 *  . set                         adds the copyright,
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
const { BOTMenu } = require('../menus/main')
    ;


// -- Local constants


// -- Local variables


// -- Private Functions --------------------------------------------------------
// none,


// -- Public -------------------------------------------------------------------

const Footer = RView.Component({

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
    this.children = { '<BOTMenu />': BOTMenu };

    return `
      <footer class="container">
        <!-- legal -->
        <div class="legal ">
          <div>
            <p class="copyright">${state.copyright || 'unknown copyright'}</p>
          </div>
          <div>
            <BOTMenu />
          </div>
        </div><!-- /.legal -->
      </footer><!-- /.footer -->
    `;
  },


  // -- Specific Methods -------------------------------------------------------

  /**
   * Adds the copyright.
   *
   * @method (arg1)
   * @public
   * @param {String}        the copyright,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  set(copyright) {
    this.$setState({ copyright });
    return this;
  },
});


// -- Export
module.exports = Footer;
