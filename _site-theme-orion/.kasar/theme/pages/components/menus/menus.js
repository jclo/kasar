// ESLint declarations
/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */

'use strict';

// -- Node modules
const View = require('@mobilabs/view')
    ;


// -- Local modules


// -- Local constants


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Adds the menu to the DOM.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the menu parent node,
 * @param {Array}           the menu items,
 * @returns {}               -,
 * @since 0.0.0
 */
function appendMenu(node, menu) {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].link) {
      node
        .append('li')
        .attr('class', 'pure-menu-item')
        .append('a')
        .attr('class', 'nav pure-menu-link')
        .attr('href', menu[i].link)
        .text(menu[i].text)
        .parent()
        .parent()
      ;
    } else {
      node
        .append('li')
        .attr('class', 'pure-menu-item')
        .text(menu[i].text)
        .parent()
      ;
    }
  }
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
    this.$('a')
      .attr('href', title.link)
      .text(title.text)
    ;
    return this;
  },

  /**
   * Fills the menu.
   */
  setMenu(menu) {
    appendMenu(this.$('ul'), menu);
    return this;
  },

  /**
   * Renders the web component.
   */
  render() {
    return `
      <div class="top left menu pure-menu pure-menu-horizontal">
        <a class="nav pure-menu-heading" href="{{page:home}}">{{head:company}}</a>
        <ul class="pure-menu-list"><!-- top left menu here --></ul>
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
    appendMenu(this.$('ul'), menu);
    return this;
  },

  /**
   * Renders the web component.
   */
  render() {
    return `
      <div class="top right menu pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list"><!-- top right menu here --></ul>
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
    appendMenu(this.$('ul'), menu);
    return this;
  },

  /**
   * Renders the web component.
   */
  render() {
    return `
      <div class="bottom menu pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list pull-right"><!-- bottom menu here --></ul>
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
