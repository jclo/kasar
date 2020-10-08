// ESLint declarations
/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0,
  no-underscore-dangle: 0 */

'use strict';

// -- Node modules
const View = require('@mobilabs/rview')
    ;


// -- Local modules


// -- Local constants


// -- Local variables


// -- Private Functions --------------------------------------------------------


/**
 * Builds the child menu.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the child level menu,
 * @returns {Object}        returns the menu,
 * @since 0.0.0
 */
function _buildChildren(children) {
  let s
    , child
    , target
    , active
    ;

  s = '';
  for (let i = 0; i < children.length; i++) {
    child = children[i];
    target = child.target ? child.target : '_self';
    if (!active && child.tag === 'youarehere') active = true;

    s += `
      <li class="${child.tag} pure-menu-item">
        <a class="pure-menu-link" href="${child.link}" target="${target}">${child.text}
          <div class="bar"></div>
        </a>
      </li>
    `;
  }
  return { active, menu: s };
}

/**
 * Builds the side menu.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the side level menu,
 * @returns {XMLString}     returns the menu,
 * @since 0.0.0
 */
function _buildSideMenu(sidemenu) {
  let s
    , classes
    , href
    , mchild
    ;

  s = '<ul class="pure-menu-list">';
  for (let i = 0; i < sidemenu.length; i++) {
    classes = sidemenu[i].tag ? sidemenu[i].tag : '';
    classes += ' pure-menu-item  pure-menu-has-children';
    classes += sidemenu[i].onlyExpanded ? ' pure-menu-only-expanded' : '';
    href = sidemenu[i].link ? sidemenu[i].link : '#';

    mchild = _buildChildren(sidemenu[i].children);
    classes += mchild.active ? ' pure-menu-active' : '';

    s += `
      <li class="${classes}">
        <a class="pure-menu-link" href="${href}">${sidemenu[i].text}</a>
        <ul class="pure-menu-children">
          ${mchild.menu}
        </ul>
      </li>
    `;
  }
  s += '</ul>';
  return s;
}

/**
 * Builds the menu.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Array}           the first level menu,
 * @param {Array}           the side menu,
 * @returns {XMLString}     returns the menu,
 * @since 0.0.0
 */
function _buildMenu(menu, sidemenu) {
  let s
    , classes
    , target
    ;

  s = '';
  for (let i = 0; i < menu.length; i++) {
    classes = menu[i].tag ? `${menu[i].tag} pure-menu-item` : 'pure-menu-item';
    target = menu[i].target ? menu[i].target : '_self';

    if (menu[i].link) {
      s += `
        <li class="${classes}">
          <a class="pure-menu-link" href="${menu[i].link}" target="${target}">${menu[i].text}
            <div class="bar"></div>
          </a>
          <!-- side menu here -->
          ${menu[i].tag === 'here' && sidemenu ? _buildSideMenu(sidemenu) : ''}
        </li>
      `;
    } else {
      s += `
        <li class="${classes}">${menu[i].text}</li>
      `;
    }
  }
  return s;
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
  fill(mobile, sidemenu /* , submenu */) {
    const { menu } = mobile;
    this.$setState({ title: mobile.title.text, menu: _buildMenu(menu, sidemenu) });
  },

  /**
   * Renders the web component.
   */
  render(state) {
    return `
      <div class="sidemenu">
        <div class="sidebutton">
          <a class="menu-button">
            <span class="menu-icon"></span>
            <span class="menu-text"></span>
          </a>
        </div>
        <div class="inner">
          <h1>${state.title}</h1>
          <div class="menu pure-menu custom-restricted-width">
            <ul class="pure-menu-list">
              <!-- menu here -->
              ${state.menu || ''}
            </ul>
          </div>
        </div>
      </div>
    `;
  },
});


// -- Export
module.exports = SideMenu;
