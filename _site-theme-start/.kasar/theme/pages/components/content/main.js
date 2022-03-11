// ESLint declarations
/* eslint one-var: 0, semi-style: 0, import/no-extraneous-dependencies: 0 */

'use strict';

// -- Node modules
const RView = require('@mobilabs/rview')
    ;


// -- Local modules


// -- Local constants


// -- Local variables


// -- Private Function(s) ------------------------------------------------------


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
const Content = RView.Component({

  /**
   * Inserts the content structure of the frontpage inside the DOM.
   */
  setFront() {
    this.state.level = 'front';
    return this;
  },

  /**
   * Inserts the content structure of the internal pages inside the DOM.
   */
  setInternal() {
    this.state.level = '';
    return this;
  },

  /**
   * Fills the content.
   */
  fill(content) {
    this.$setState({ content });
    return this;
  },

  /**
   * Renders the web component.
   */
  render(state) {
    return `
      <div class="content ${state.level || ''}">
        <div class="container">
          ${state.content || '<!-- empty -->'}
        </div><!-- /.container -->
      </div>
    `;
  },
});


// -- Export
module.exports = Content;
