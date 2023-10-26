/** ************************************************************************
 *
 * Generates an XMLString menu from a menu object.
 *
 * util1.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _addChildren                adds children menus,
 *  . _addMenuWithChildren        adds a menu with children,
 *  . _addSimpleMenu              adds a simple menu,
 *  . _getMenu                    returns the requested menu,
 *
 *
 * Public Static Methods:
 *  . getMenu                     returns the requested menu,
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


// -- Vendor Modules


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Adds children menus.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the menu,
 * @param {String}          the link target,
 * @returns {XMLString}     returns the children menus,
 * @since 0.0.0
 */
function _addChildren(menu, target) {
  let child = ''
    , icon
    ;

  for (let i = 0; i < menu.children.length; i++) {
    icon = menu.children[i].icon || '';

    child += `
      <li class="pure-menu-item">
        <a class="nav pure-menu-link" href="${menu.children[i].link}"${target}>${icon}${menu.children[i].text}</a>
      </li>
    `;
  }

  return child;
}

/**
 * Adds a menu with children.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the menu,
 * @returns {XMLString}     returns the generated menu,
 * @since 0.0.0
 */
function _addMenuWithChildren(menu) {
  const target = menu.target ? ` target="${menu.target}"` : ''
      ;

  return `
    <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
      <a class="nav pure-menu-link" href="${menu.link}"${target}>${menu.icon || ''}${menu.text}</a>
      <ul class="pure-menu-children">
        <div>
          <div class="pure-menu-children-orient-up pure-menu-children-orient-up-center">
            ${_addChildren(menu, target)}
          </div>
        </div>
      </ul>
    </li>
  `;
}

/**
 * Adds a simple menu.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the menu,
 * @returns {XMLString}     returns the generated menu,
 * @since 0.0.0
 */
function _addSimpleMenu(menu) {
  const target = menu.target ? ` target="${menu.target}"` : ''
      ;

  return `
    <li class="pure-menu-item">
      <a class="nav pure-menu-link" href="${menu.link}"${target}>${menu.icon || ''}${menu.text}</a>
    </li>
`;
}

/**
 * Returns the requested menu.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the menu,
 * @returns {XMLString}     returns the generated menu,
 * @since 0.0.0
 */
function _getMenu(menu) {
  let li = '';

  if (menu) {
    for (let i = 0; i < menu.length; i++) {
      li += menu[i].children
        ? _addMenuWithChildren(menu[i])
        : _addSimpleMenu(menu[i])
      ;
    }
  }

  return li;
}


// -- Public Static Methods ------------------------------------------------

const U = {

  /**
   * Returns the requested menu.
   *
   * @method (arg1)
   * @public
   * @param {Array}         the menu,
   * @returns {XMLString}   returns the generated menu,
   * @since 0.0.0
   */
  getMenu(menu) {
    return _getMenu(menu);
  },
};


// -- Export
export default U;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
