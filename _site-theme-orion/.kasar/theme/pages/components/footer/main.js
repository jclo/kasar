// ESLint declarations
/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */

'use strict';

// -- Node modules
const View = require('@mobilabs/view')
    ;


// -- Local modules
const { BOTMenu } = require('../menus/menus')
    ;

// -- Local constants


// -- Local variables


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
const Footer = View.Component({

  /**
   * Adds the copyright.
   */
  set(copyright) {
    this.$('.copyright').text(copyright);
    return this;
  },

  /**
   * Renders the web component.
   */
  render() {
    this.children = { '<BOTMenu />': BOTMenu };

    return `
      <footer class="container">
        <!-- legal -->
        <div class="legal pure-g">
          <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p class="copyright">{{head:copyright}}</p>
          </div>
          <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <BOTMenu />
          </div>
        </div><!-- /.legal -->
      </footer><!-- /.footer -->
    `;
  },
});


// -- Export
module.exports = Footer;
