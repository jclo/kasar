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
 * Adds the main menu.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the node object,
 * @param {Array}           the menu items,
 * @returns {}              -,
 * @since 0.0.0
 */
function addMenu(node, menu) {
  for (let i = 0; i < menu.length; i++) {
    const classes = menu[i].tag ? `${menu[i].tag} pure-menu-item` : 'pure-menu-item';

    if (menu[i].link) {
      node
        .append('li')
        .attr('class', classes)
        .append('a')
        .attr('class', 'pure-menu-link')
        .attr('href', menu[i].link)
        .attr('target', menu[i].target ? menu[i].target : '_self')
        .appendTextChild(menu[i].text)
        // .parent()
        .append('div')
        .attr('class', 'bar')
        .parent()
        .parent()
        .parent()
      ;
    } else {
      node
        .append('li')
        .attr('class', classes)
        .appendTextChild(menu[i].text)
        .parent()
      ;
    }
  }
}

/**
 * Adds the side menu.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the node object,
 * @param {Array}           the menu items,
 * @returns {}              -,
 * @since 0.0.0
 */
function addSidemenu(node, sidemenu) {
  node
    .select('.here')
    .append('ul')
    .attr('class', 'pure-menu-list')
  ;

  for (let i = 0; i < sidemenu.length; i++) {
    let classes = sidemenu[i].tag ? sidemenu[i].tag : '';
    classes += ' pure-menu-item  pure-menu-has-children';
    classes += sidemenu[i].onlyExpanded ? ' pure-menu-only-expanded' : '';

    node
      .append('li')
      .attr('class', classes)
      .append('a')
      .attr('class', 'pure-menu-link')
      .attr('href', sidemenu[i].link ? sidemenu[i].link : '#')
      .appendTextChild(sidemenu[i].text)
      .parent()
      .append('ul')
      .attr('class', 'pure-menu-children')
    ;

    // Append childs
    for (let j = 0; j < sidemenu[i].children.length; j++) {
      const child = sidemenu[i].children[j];
      node
        .append('li')
        .attr('class', `${child.tag} pure-menu-item`)
        .append('a')
        .attr('class', 'pure-menu-link')
        .attr('href', child.link)
        .attr('target', child.target ? child.target : '_self')
        .appendTextChild(child.text)
        .append('div')
        .attr('class', 'bar')
        .parent()
        .parent()
        .parent()
      ;
    }
    node.parent();
  }
}

/**
 * Adds the submenu to the side menu.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the node object,
 * @param {Array}           the menu items,
 * @returns {}              -,
 * @since 0.0.0
 */
function addSubmenu(node, submenu) {
  node
    .parent()
    .parent()
    .addClass('pure-menu-active')
    .select('.youarehere')
    .addClass('pure-menu-active')
  ;
}


// -- Public Functions ---------------------------------------------------------

/**
 * Defines the web component for the bottom menu.
 *
 * @function ()
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
const SideMenu = View.Component({

  /**
   * Fills the menu.
   */
  fill(mobile, sidemenu, submenu) {
    const { menu } = mobile;

    // Add title:
    this.$('h1').text(mobile.title.text);

    // Add Menu:
    addMenu(this.$('ul'), menu);

    // Add Side Menu:
    if (sidemenu) {
      addSidemenu(this.$('ul'), sidemenu);
      addSubmenu(this.$('.youarehere'), submenu);
    }
  },

  /**
   * Renders the web component.
   */
  render() {
    return `
      <div class="sidemenu">
        <div class="sidebutton">
          <a class="menu-button">
            <span class="menu-icon"></span>
            <span class="menu-text"></span>
          </a>
        </div>
        <div class="inner">
          <h1>???</h1>
          <div class="menu pure-menu custom-restricted-width">
            <ul class="pure-menu-list">
              <!-- menu here -->
            </ul>
          </div>
        </div>
      </div>
    `;
  },
});


// -- Export
module.exports = SideMenu;
