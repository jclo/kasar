// ESLint declarations
/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */

'use strict';

// -- Node modules
const View = require('@mobilabs/rview')
    ;


// -- Local modules


// -- Local constants


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Adds the menu to the DOM.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the menu items,
 * @returns {XMLString}     the HTML menu,
 * @since 0.0.0
 */
function appendMenu(menu) {
  let li = '';
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].link) {
      li += `
        <li class="pure-menu-item">
          <a class="nav pure-menu-link" href="${menu[i].link}">${menu[i].text}</a>
        </li>`;
    } else {
      li += `<li class="pure-menu-item">${menu[i].text}</li>`;
    }
  }
  return li;
}


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
   * Adds the menu title.
   */
  setTitle(title) {
    this.$setState({ link: title.link, title: title.text });
    return this;
  },

  /**
   * Fills the menu.
   */
  setMenu(menu) {
    this.$setState({ menu: appendMenu(menu) });
    return this;
  },

  /**
   * Renders the web component.
   */
  render(state) {
    return `
      <div class="top left menu pure-menu pure-menu-horizontal">
        <a class="nav pure-menu-heading" href="${state.link}">${state.title}</a>
        <ul class="pure-menu-list">
          <!-- top left menu here -->
          ${state.menu || ''}
        </ul>
      </div><!-- /.top left menu -->
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

  /**
   * Fills the menu.
   */
  set(menu) {
    this.$setState({ menu: appendMenu(menu) });
    return this;
  },

  /**
   * Renders the web component.
   */
  render(state) {
    return `
      <div class="top right menu pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          <!-- top right menu here -->
          ${state.menu}
        </ul>
      </div><!-- /.top right menu -->
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
   * Fills the menu.
   */
  set(menu) {
    this.$setState({ menu: appendMenu(menu) });
    return this;
  },

  /**
   * Renders the web component.
   */
  render(state) {
    return `
      <div class="bottom menu pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list pull-right">
          <!-- bottom menu here -->
          ${state.menu}
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
