// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules
const View = require('@mobilabs/rview')
    ;


// -- Local modules
const { TLMenu } = require('../menus/main')
    , { TRMenu } = require('../menus/main')
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
const Header = View.Component({

  /**
   * Renders the web component.
   */
  render() {
    this.children = { '<TLMenu />': TLMenu, '<TRMenu />': TRMenu };

    return `
      <header>
        <div class="navbar navbar-fixed-top">
          <div class="container">
            <!-- grid -->
            <div class="pure-g">
              <!-- Left block & logo -->
              <div class="logo pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
                <TLMenu />
              </div><!-- /.logo -->
              <!-- Right block -->
              <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
                <!-- Top menu -->
                  <TRMenu />
              </div>
            </div><!-- /.grid -->
          </div><!-- /.container -->
        </div><!-- /. navbar -->
      </header><!-- /.header -->
    `;
  },
});


// -- Export
module.exports = Header;
