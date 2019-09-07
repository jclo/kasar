// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules
const View = require('@mobilabs/view')
    ;


// -- Local modules


// -- Local constants


// -- Local variables


// -- Private Function(s) ------------------------------------------------------

/**
 * Defines the marketing structure of the front web page.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {String}        returns the marketing HTML structure,
 * @since 0.0.0
 */
function getFront() {
  return `
    <div class="marketing">
      <div class="container">
        <div class="splash">
          <noscript>Your browser does not support JavaScript!</noscript>
          <!-- content here -->
        </div>
      </div>
    </div>
  `;
}

/**
 * Defines the marketing structure of the front web page.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {String}        returns the marketing HTML structure,
 * @since 0.0.0
 */
function getInternal() {
  return `
    <div class="marketing inside">
      <div class="container">
        <div class="inbox">
          <img src="img/banner.jpg" alt="" />
        </div>
      </div>
    </div>
  `;
}


// -- Public Function(s) -------------------------------------------------------

/**
 * Defines the web component.
 *
 * @function ()
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
const Marketing = View.Component({

  /**
   * Adds the marketing structure to the frontpage.
   */
  setFront() {
    this.$().html(getFront());
    return this;
  },

  /**
   * Adds the marketing structure to the internal pages.
   */
  setInternal() {
    this.$().html(getInternal());
    return this;
  },

  /**
   * Adds the marketing content for the frontpage.
   */
  fillFrontContent(content) {
    this.$('.splash').html(content);
    return this;
  },

  /**
   * Renders the web component.
   */
  render() {
    return '<div></div><!-- /.marketing -->';
  },
});


// -- Export
module.exports = Marketing;
