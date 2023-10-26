/** ****************************************************************************
 *
 * Defines the side menu of the web page.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
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


// -- Local Variables


// -- Private Functions --------------------------------------------------------

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
function _createMenu(website, menu, lang, page, docmenu) {
  let li = '';

  if (menu && menu[lang] && Array.isArray(menu[lang].mobile)) {
    let mob
      , target
      , icon
      , link
      ;

    for (let i = 0; i < menu[lang].mobile.length; i++) {
      mob = menu[lang].mobile[i];
      target = mob.target ? ` target="${mob.target}"` : '';
      icon = mob.icon || '';

      if (mob.link) {
        li += `
          <li class="pure-menu-item">
            <a href="${mob.link}${target}" class="pure-menu-link">${icon}${mob.text}</a>
            <div class="bar"></div>
            ${mob.tag === 'doc' && docmenu ? docmenu : ''}
          </li>
        `;
      } else if (mob.lang && website[mob.lang] && website[mob.lang][page]) {
        link = website[mob.lang][page].link;
        li += `
          <li class="pure-menu-item">
            <a class="nav pure-menu-link" href="${link}"${target}>${icon}${mob.text}</a>
            <div class="bar"></div>
          </li>
        `;
      } else {
        li += `<li class="pure-menu-item">${icon}${mob.text}</li>`;
      }
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
