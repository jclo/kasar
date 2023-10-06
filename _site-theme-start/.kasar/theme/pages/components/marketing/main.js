/** ****************************************************************************
 *
 * Defines the Marketing section of the web page.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _getFront                   defines the mkt structure of the front page,
 *  . _getInternal                defines the mkt structure of the internal page(s),
 *
 *
 * Overwritten Public Methods:
 *  . render                      returns the XMLString of the component,
 *
 *
 * Specific Public Methods:
 *  . fillInternal                adds the marketing content for the internal pages,
 *  . fillFrontContent            adds the marketing content for the frontpage,
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

// -- Node modules
const RView = require('@mobilabs/rview');


// -- Local modules


// -- Local constants


// -- Local variables


// -- Private Function(s) ------------------------------------------------------

/**
 * Defines the marketing structure of the front web page.
 *
 * @function (arg1)
 * @private
 * @param {XMLString}       the content of the page,
 * @returns {XMLString}     returns the marketing HTML structure,
 * @since 0.0.0
 */
function _getFront(content) {
  return `
    <div class="marketing">
      <div class="container">
        <div class="splash">
          <noscript>Your browser does not support JavaScript!</noscript>
          <!-- content here -->
          ${content || ''}
        </div>
      </div>
    </div>
  `;
}

/**
 * Defines the marketing structure of the internal web page(s).
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {XMLString}     returns the marketing HTML structure,
 * @since 0.0.0
 */
function _getInternal() {
  return `
    <div class="marketing inside">
      <div class="container">
        <div class="inbox">
          <!-- <img src="img/banner.jpg" alt="" /> -->
        </div>
      </div>
    </div>
  `;
}


// -- Public -------------------------------------------------------------------

const Marketing = RView.Component({

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
    return `<div>${state.mkt || ''}</div><!-- /.marketing -->`;
  },


  // -- Specific Methods -------------------------------------------------------

  /**
   * Adds the marketing structure to the internal pages.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  fillInternal(content) {
    this.$setState({ mkt: _getInternal(content) });
    return this;
  },

  /**
   * Adds the marketing content for the frontpage.
   *
   * @method (arg1)
   * @public
   * @param {XMLString}     the content of the page,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  fillFront(content) {
    this.$setState({ mkt: _getFront(content) });
    return this;
  },
});


// -- Export
module.exports = Marketing;
