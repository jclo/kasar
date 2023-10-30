/** ************************************************************************
 *
 * Utility function(s).
 *
 * util.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *   . _findLink                  searchs for the lang twin page link,
 *  . _addChildren                adds a children to the menu,
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
 * Searchs for the twin page link in another langage.
 *
 * @function (arg1, arg2, arg3, [arg4])
 * @private
 * @param {Object}          the website,
 * @param {string}          the page to select,
 * @param {Object}          the concerned submenu,
 * @param {Object}          the docsite,
 * @returns {string}        the matching page link,
 */
/* eslint-disable no-restricted-syntax, guard-for-in */
function _findLink(website, page, submenu, docsite) {
  // Return if the link exist.
  if (website[submenu.lang][page]) {
    return website[submenu.lang][page].link;
  }

  if (docsite && docsite[submenu.lang] && docsite[submenu.lang][page]) {
    return docsite[submenu.lang][page].link;
  }

  // Search for the first matching link whatever
  // the langage.
  for (const lang in website) {
    if (website[lang][page]) {
      return website[lang][page].link;
    }
  }

  if (docsite) {
    for (const lang in docsite) {
      if (docsite[lang][page]) {
        return docsite[lang][page].link;
      }
    }
  }

  // Must never occur!
  return '#';
}
/* eslint-enable no-restricted-syntax, guard-for-in */

/**
 * Adds a children to the menu.
 *
 * @function (arg1, arg2, arg3, arg4, [arg5])
 * @private
 * @param {Object}        the website as defined in config,
 * @param {Array}         the menu to build,
 * @param {String}        the active website or docsite page,
 * @param {Object}        the docsite,
 * @returns {XMLString}   returns the generated menu,
 * @since 0.0.0
 */
/* eslint-disable no-continue */
function _addChildren(website, menu, page, target, docsite) {
  let child = ''
    , icon
    , link
    ;

  for (let i = 0; i < menu.children.length; i++) {
    icon = menu.children[i].icon || '';

    if (menu.children[i].link) {
      child += `
        <li class="pure-menu-item">
          <a class="nav pure-menu-link" href="${menu.children[i].link}"${target}>${icon}${menu.children[i].text}</a>
        </li>
      `;
      continue;
    }

    if (menu.children[i].lang) {
      link = _findLink(website, page, menu.children[i], docsite);

      child += `
        <li class="pure-menu-item">
          <a class="nav pure-menu-link" href="${link}"${target}>${icon}${menu.children[i].text}</a>
        </li>
      `;
      continue;
    }

    child += `<li class="pure-menu-item">${icon}${menu.children[i].text}</li>`;
  }

  return child;
}
/* eslint-enable no-continue */

/**
 * Creates a menu with children.
 *
 * @function (arg1, arg2, arg3, arg4, [arg5])
 * @private
 * @param {Object}        the website as defined in config,
 * @param {Array}         the menu to build,
 * @param {String}        the active language,
 * @param {String}        the active website or docsite page,
 * @param {Object}        the docsite,
 * @returns {XMLString}   returns the generated menu,
 * @since 0.0.0
 */
function _addMenuWithChildren(website, menu, lang, page, docsite) {
  const target = menu.target ? ` target="${menu.target}"` : ''
      ;

  let link;

  if (menu.link) {
    return `
      <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
        <a class="nav pure-menu-link" href="${menu.link}"${target}>${menu.icon || ''}${menu.text}</a>
        <ul class="pure-menu-children">
          <div>
            <div class="pure-menu-children-orient-up pure-menu-children-orient-up-center">
              ${_addChildren(website, menu, page, target, docsite)}
            </div>
          </div>
        </ul>
      </li>
    `;
  }

  if (menu.lang) {
    link = _findLink(website, page, menu, docsite);

    return `
      <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
        <a class="nav pure-menu-link" href="${link}"${target}>${menu.icon || ''}${menu.text}</a>
        <ul class="pure-menu-children">
          <div>
            <div class="pure-menu-children-orient-up pure-menu-children-orient-up-center">
              ${_addChildren(website, menu, page, target, docsite)}
            </div>
          </div>
        </ul>
      </li>
      `;
  }

  return `
    <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">${menu.icon || ''}${menu.text}
      <ul class="pure-menu-children">
        <div>
          <div class="pure-menu-children-orient-up pure-menu-children-orient-up-center">
            ${_addChildren(website, menu, page, target, docsite)}
          </div>
        </div>
      </ul>
    </li>
  `;
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

  if (menu.link) {
    return `
      <li class="pure-menu-item">
        <a class="nav pure-menu-link" href="${menu.link}"${target}>${icon}${menu.text}</a>
      </li>
    `;
  }

  if (menu.lang) {
    const { link } = website[menu.lang][page];
    return `
      <li class="pure-menu-item">
        <a class="nav pure-menu-link" href="${link}"${target}>${icon}${menu.text}</a>
      </li>
    `;
  }

  return `<li class="pure-menu-item">${icon}${menu.text}</li>`;
}

/**
 * Creates and returns the menu.
 *
 * @function (arg1, arg2, arg3, arg4, [arg5])
 * @private
 * @param {Object}        the website as defined in config,
 * @param {Array}         the menu to build,
 * @param {String}        the active language,
 * @param {String}        the active website or docsite page,
 * @param {Object}        the docsite,
 * @returns {XMLString}   returns the generated menu,
 * @since 0.0.0
 */
function _appendMenu(website, menu, lang, page, docsite) {
  let li = '';
  for (let i = 0; i < menu.length; i++) {
    li += menu[i].children
      ? _addMenuWithChildren(website, menu[i], lang, page, docsite)
      : _addMenu(website, menu[i], lang, page);
  }
  return li;
}


// -- Public Static Methods ------------------------------------------------

const Util = {

  /**
   * Creates and returns the menu.
   *
   * @method (arg1, arg2, arg3, arg4, [arg5])
   * @public
   * @param {Object}        the website as defined in config,
   * @param {Array}         the menu to build,
   * @param {String}        the active language,
   * @param {String}        the active website or docsite page,
   * @param {Object}        the docsite,
   * @returns {XMLString}   returns the generated menu,
   * @since 0.0.0
   */
  appendMenu(website, menu, lang, page, docsite) {
    return _appendMenu(website, menu, lang, page, docsite);
  },
};


// -- Export
module.exports = Util;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
