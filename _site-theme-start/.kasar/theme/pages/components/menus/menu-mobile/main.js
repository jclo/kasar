/** ****************************************************************************
 *
 * Defines the side menu of the web page.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _renderFlagsWithChildren    renders the language menu,
 *  . _renderMenuOrFlagWithCh...  renders the language menu,
 *  . _renderSimpleMenu           renders a simple menu,
 *  . _createMenu                 creates the side  menu,
 *  . _findHome                   finds and returns the home link,
 *
 *
 * Overwritten Public Methods:
 *  . render                      returns the XMLString of the component,
 *
 *
 * Specific Public Methods:
 *  . set                         updates the links,
 *
 *
 *
 * @namespace -
 * @exports   -
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle,
  import/no-extraneous-dependencies */

'use strict';

// -- Vendor Modules
const RView = require('@mobilabs/rview');


// -- Local Modules


// -- Local Constants
const FLAGS_FOR_LANG = 'lang';


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Renders the language menu.
 *
 * @function (arg1)
 * @private
 * @param {Object}        the menu,
 * @returns {XMLString}   returns the generated menu,
 * @since 0.0.0
 */
function _renderFlagsWithChildren(menu) {
  let li = ''
    , child
    , icon
    ;

  for (let i = 0; i < menu.children.length; i++) {
    child = menu.children[i];
    icon = child.icon || '???';

    li += `
      <li data-menu="${child.lang}:flag:fi" class="pure-menu-item">
        <a class="pure-menu-link pure-menu-fi" href="${child.link}">${child.text}${icon}</a>
        <div class="bar"></div>
      </li>
    `;
  }

  const m = `
    <li class="pure-menu-item pure-menu-has-children pure-menu-flags">
      <a class="pure-menu-link" href="${menu.link || '#'}">${menu.icon || '???'}</a>
      <ul class="pure-menu-children">
        ${li}
      </ul>
    </li>
  `;

  return m;
}

/**
 * Renders the language menu.
 *
 * @function (arg1)
 * @private
 * @param {Object}        the menu,
 * @returns {XMLString}   returns the generated menu,
 * @since 0.0.0
 */
function _renderMenuOrFlagWithChildren(menu) {
  return menu.tag === FLAGS_FOR_LANG
    ? _renderFlagsWithChildren(menu)
    : ''
  ;
}

/**
 * Renders a simple menu.
 *
 * @function (arg1)
 * @private
 * @param {Object}        the menu,
 * @returns {XMLString}   returns the generated menu,
 * @since 0.0.0
 */
function _renderSimpleMenu(menu) {
  const target = menu.target ? ` target="${menu.target}"` : ''
      , icon   = menu.icon || ''
      ;

  return `
    <li class="pure-menu-item">
      <a class="pure-menu-link" href="${menu.link}" target="_self">${icon}${menu.text}</a>
      <div class="bar"></div>
    </li>
  `;
}

/**
 * Creates the side  menu.
 *
 * @function (arg1, arg2, arg3, arg4, [arg5])
 * @private
 * @param {Object}        the website as defined in config,
 * @param {Array}         the menu to build,
 * @param {String}        the active language,
 * @param {String}        the active website page,
 * @param {Array}         the menu of the documentation page,
 * @returns {XMLString}   returns the generated menu,
 * @since 0.0.0
 */
function _createMenu(website, menu, lang/* , page, docmenu */) {
  let li = '';

  if (menu && menu[lang] && Array.isArray(menu[lang].mobile)) {
    for (let i = 0; i < menu[lang].mobile.length; i++) {
      li += menu[lang].mobile[i].children
        ? _renderMenuOrFlagWithChildren(menu[lang].mobile[i])
        : _renderSimpleMenu(menu[lang].mobile[i])
      ;
    }
  }
  return li;
}

/**
 * Finds and returns the home link.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}        the website as defined in config,
 * @param {String}        the active language,
 * @returns {String}      returns the home link,
 * @since 0.0.0
 */
function _findHome(website, lang) {
  if (website && website[lang] && website[lang].home) {
    return website[lang].home.link;
  }
  return '';
}


// -- Public -------------------------------------------------------------------

const MobileMenu = RView.Component({

  // -- Overwritten Methods ----------------------------------------------------

  /**
   * Returns the XMLString of the component.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the state properties,
   * @param {Object}        the optional properties,
   * @returns {XMLString}   returns the XMLString of the component,
   * @since 0.0.0
   */
  render(state/* , props */) {
    return `
      <div class="mobilemenu">
        <div class="inner">
          <div class="menu pure-menu pure-menu-horizontal">
            <a class="pure-menu-heading" href="${state.home}">
              <span class="mobilemenu-logo"></span>
            </a>
          </div>
          <div class="menu pure-menu custom-restricted-width">
            <ul class="pure-menu-list">
              ${state.menu || ''}
            </ul>
          </div><!-- /.pure-menu -->
        </div><!-- /.inner -->
      </div><!-- /.mobilemenu -->
    `;
  },


  // -- Specific Methods -------------------------------------------------------

  /**
   * Updates the links.
   *
   * @method (arg1, arg2, arg3, arg4, [arg5])
   * @public
   * @param {Object}        the website as defined in config,
   * @param {Array}         the menu to build,
   * @param {String}        the active language,
   * @param {String}        the active website page,
   * @param {Array}         the docmenu,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  set(website, menu, lang, page, docmenu) {
    this.$setState({
      home: _findHome(website, lang),
      menu: _createMenu(website, menu, lang, page, docmenu),
    });
    return this;
  },
});


// Exports:
module.exports = MobileMenu;
