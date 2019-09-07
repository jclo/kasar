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
 * Defines the content structure of the front web page.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {String}        returns the content HTML structure,
 * @since 0.0.0
 */
function getFront() {
  return `
    <div class="content front">
      <div class="container">
        <!-- empty -->
      </div><!-- /.container -->
    </div>
  `;
}

/**
 * Defines the content structure of the internal web pages.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {String}        returns the content HTML structure,
 * @since 0.0.0
 */
function getInternal() {
  return `
    <div class="content">
      <div class="container">
        <div class="menu pure-menu pure-menu-horizontal">
          <!-- homemenu:inc -->
          <!-- endinject -->
          <!-- contentmenu:inc -->
          <!-- endinject -->
        </div>
        <!-- content:inc -->
        <!-- endinject -->
      </div><!-- /.container -->
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
const Content = View.Component({

  /**
   * Inserts the content structure of the frontpage inside the DOM.
   */
  setFront() {
    this.$().html(getFront());
    return this;
  },

  /**
   * Inserts the content structure of the internal pages inside the DOM.
   */
  setInternal() {
    this.$().html(getInternal());
    return this;
  },

  /**
   * Fills the content.
   */
  fill(content) {
    this.$('.container').html(content);
    return this;
  },

  /**
   * Renders the web component.
   */
  render() {
    return '<div></div><!-- /.content -->';
  },
});


// -- Export
module.exports = Content;
