// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules
const View = require('@mobilabs/rview')
    ;


// -- Local modules


// -- Local constants


// -- Local variables


// -- Public Functions ---------------------------------------------------------

/**
 * Defines the web component for the top left menu.
 *
 * @function ()
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
const TLMenu = View.Component({

  /**
   * Fills the menu.
   */
  set(company, basepath) {
    this.$setState({ basepath, company });
    return this;
  },

  /**
   * Renders the web component.
   */
  render(state) {
    return `
      <div class="top left menu pure-menu pure-menu-horizontal">
        <a class="nav pure-menu-heading" href="${state.basepath}">${state.company}</a>
        <ul class="pure-menu-list">
          <li class="pure-menu-item"><a href="{{page:...}}" class="nav pure-menu-link">...</a></li>
        </ul>
      </div><!-- /.top menu -->
    `;
  },
});


/**
 * Defines the web component for the top right menu.
 *
 * @function ()
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
const TRMenu = View.Component({

  set(path) {
    this.$setState({ path });
    return this;
  },

  /**
   * Renders the web component.
   */
  render(state) {
    return `
      <div class="top right menu pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          <li class="pure-menu-item"><a href=${state.path} class="nav pure-menu-link">Contact Us</a></li>
        </ul>
      </div><!-- /.top menu -->
    `;
  },
});


/**
 * Defines the web component for the bottom menu.
 *
 * @function ()
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
const BOTMenu = View.Component({

  /**
   * Renders the web component.
   */
  render() {
    return `
      <div class="menu pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list pull-right">
          <li class="pure-menu-item"><a href="contact.html" class="pure-menu-link">contact</a></li>
          <li class="pure-menu-item"><a href="legal.html" class="pure-menu-link">legal</a></li>
          <li class="pure-menu-item">built with Kasar</li>
        </ul>
      </div><!-- /.bottom menu -->
    `;
  },
});


// -- Export
module.exports = {
  TLMenu,
  TRMenu,
  BOTMenu,
};
