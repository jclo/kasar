/** ****************************************************************************
 *
 * Defines the content section of the web page.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _getContent                 returns the XMLString of the component,
 *
 *
 * Overwritten Public Methods:
 *  . render                      returns the XMLString of the component,
 *
 *
 * Specific Public Methods:
 *  . fill                        fills the content,
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
const RView = require('@mobilabs/rview')
    ;


// -- Local modules


// -- Local constants


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Returns the contents of the pages.
 *
 * @function (arg1)
 * @private
 * @param {XMLString}       the content of the page,
 * @returns {XMLString}     returns the contents structure,
 * @since 0.0.0
 */
function _getContent(content) {
  return `
    <div class="content-body">${content}</div>
  `;
}


// -- Public -------------------------------------------------------------------

const Content = RView.Component({

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
      <div class="content ${state.level || ''}">
        <div class="container">
          ${state.content || '<!-- empty -->'}
        </div><!-- /.container -->
      </div>
    `;
  },


  // -- Specific Methods -------------------------------------------------------

  /**
   * Fills the content.
   *
   * @method (arg1)
   * @public
   * @param {XMLString}     the content of the page,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  fill(content) {
    this.$setState({ content: _getContent(content) });
    return this;
  },
});


// -- Export
module.exports = Content;
