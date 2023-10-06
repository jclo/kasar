/** ************************************************************************
 *
 * Utility function(s).
 *
 * util.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _addMenuWithChildren        creates a menu with children,
 *  . _addMenu                    creates a one level menu,
 *  . _appendMenu                 creates and returns the menu,
 *
 *
 * Public Static Methods:
 *  . appendMenu                  creates and returns the menu,
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ********************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle */

'use strict';

// -- Vendor Modules


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Creates a menu with children.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Object}        the website as defined in config,
 * @param {Array}         the menu to build,
 * @param {String}        the active language,
 * @param {String}        the active website page,
 * @returns {XMLString}   returns the generated menu,
 * @since 0.0.0
 */
function _addMenuWithChildren(website, menu, lang, page) {
  const target = menu.target ? ` target="${menu.target}"` : ''
      ;

  let li = ''
    , link
    , icon
    ;

  if (menu.link) {
    li += `
      <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
        <a class="nav pure-menu-link" href="${menu.link}"${target}>${menu.icon || ''}${menu.text}</a>
      `;
  } else if (menu.lang) {
    link = website[menu.lang][page].output;
    li += `
      <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
        <a class="nav pure-menu-link" href="${link}"${target}>${menu.icon || ''}${menu.text}</a>
      `;
  } else {
    li += `<li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">${menu.icon || ''}${menu.text}`;
  }

  li += '<ul class="pure-menu-children">';
  li += '<div><div class="pure-menu-children-orient-up pure-menu-children-orient-up-center">';
  for (let i = 0; i < menu.children.length; i++) {
    icon = menu.children[i].icon || '';

    if (menu.children[i].link) {
      li += `
        <li class="pure-menu-item">
          <a class="nav pure-menu-link" href="${menu.children[i].link}"${target}>${icon}${menu.children[i].text}</a>
        </li>`;
    } else if (menu.children[i].lang) {
      link = website[menu.children[i].lang][page].output;
      li += `
        <li class="pure-menu-item">
          <a class="nav pure-menu-link" href="${link}"${target}>${icon}${menu.children[i].text}</a>
        </li>`;
    } else {
      li += `<li class="pure-menu-item">${icon}${menu.children[i].text}</li>`;
    }
  }
  li += '</div></div></ul></li>';

  return li;
}

/**
 * Creates a one level menu.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Object}        the website as defined in config,
 * @param {Array}         the menu to build,
 * @param {String}        the active language,
 * @param {String}        the active website page,
 * @returns {XMLString}   returns the generated menu,
 * @since 0.0.0
 */
function _addMenu(website, menu, lang, page) {
  const target = menu.target ? ` target="${menu.target}"` : ''
      , icon   = menu.icon || ''
      ;

  let li = '';
  if (menu.link) {
    li += `
      <li class="pure-menu-item">
        <a class="nav pure-menu-link" href="${menu.link}"${target}>${icon}${menu.text}</a>
      </li>`;
  } else if (menu.lang) {
    const link = website[menu.lang][page].output;
    li += `
      <li class="pure-menu-item">
        <a class="nav pure-menu-link" href="${link}"${target}>${icon}${menu.text}</a>
      </li>`;
  } else {
    li += `<li class="pure-menu-item">${icon}${menu.text}</li>`;
  }

  return li;
}

/**
 * Creates and returns the menu.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Object}        the website as defined in config,
 * @param {Array}         the menu to build,
 * @param {String}        the active language,
 * @param {String}        the active website page,
 * @returns {XMLString}   returns the generated menu,
 * @since 0.0.0
 */
function _appendMenu(website, menu, lang, page) {
  let li = '';
  for (let i = 0; i < menu.length; i++) {
    li += menu[i].children
      ? _addMenuWithChildren(website, menu[i], lang, page)
      : _addMenu(website, menu[i], lang, page);
  }
  return li;
}


// -- Public Static Methods ------------------------------------------------

const Util = {

  /**
   * Creates and returns the menu.
   *
   * @method (arg1, arg2, arg3, arg4)
   * @public
   * @param {Object}        the website as defined in config,
   * @param {Array}         the menu to build,
   * @param {String}        the active language,
   * @param {String}        the active website page,
   * @returns {XMLString}   returns the generated menu,
   * @since 0.0.0
   */
  appendMenu(website, menu, lang, page) {
    return _appendMenu(website, menu, lang, page);
  },
};


// -- Export
module.exports = Util;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
