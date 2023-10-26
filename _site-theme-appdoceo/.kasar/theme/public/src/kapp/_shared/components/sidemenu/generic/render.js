/** ************************************************************************
 *
 * Renders the generic side menu component.
 *
 * render.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _renderFlagsWithChildren    renders a flag menu with children,
 *  . _renderMenuWithChildren     renders a classic menu item with children,
 *  . _renderMenuOrFlagWith...    renders a menu item with children,
 *  . _renderSimpleMenu           renders a menu item,
 *  . _renderMenu                 renders the contents of the side menu,
 *  . _render                     renders the component,
 *
 *
 * Public Static Methods:
 *  . render                      renders the component,
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
const FLAGS_FOR_LANG = 'lang';


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Renders a flag menu with children.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @param {Array}           the menu,
 * @returns {XMLString}     returns the rendered data,
 * @since 0.0.0
 */
function _renderFlagsWithChildren(state, props, menu) {
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

  const active = state.openmenu.indexOf(`${menu.lang}:flag:fi`) > -1 ? ' pure-menu-active' : '';
  const m = `
    <li data-menu="${menu.lang}:flag:fi" class="pure-menu-item pure-menu-has-children${active}">
      <a class="pure-menu-link" href="${menu.link || '#'}">${menu.icon || '???'}</a>
      <ul class="pure-menu-children">
        ${li}
      </ul>
    </li>
  `;

  return m;
}

/**
 * Renders a classic menu item with children.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @param {Array}           the menu,
 * @returns {XMLString}     returns the rendered data,
 * @since 0.0.0
 */
function _renderMenuWithChildren(state, props, menu) {
  let li = ''
    , child
    , cactive
    , icon
    ;

  for (let i = 0; i < menu.children.length; i++) {
    child = menu.children[i];
    cactive = state.activemenu === `${child.lang}:${child.name}` ? ' pure-menu-active' : '';
    icon = child.icon || '';

    li += `
      <li data-menu="${child.lang}:${child.name}" class="pure-menu-item${cactive}">
        <a class="pure-menu-link" href="${child.link}">${icon}${child.text}</a>
        <div class="bar"></div>
      </li>
    `;
  }

  const active = state.openmenu.indexOf(`${menu.lang}:${menu.name}`) > -1 ? ' pure-menu-active' : '';
  const m = `
    <li data-menu="${menu.lang}:${menu.name}" class="pure-menu-item pure-menu-has-children${active}">
      <a class="pure-menu-link" href="${menu.link || '#'}">${menu.text}</a>
      <ul class="pure-menu-children">
        ${li}
      </ul>
    </li>
  `;

  return m;
}

/**
 * Renders a menu item with children.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @param {Array}           the menu,
 * @returns {XMLString}     returns the rendered data,
 * @since 0.0.0
 */
function _renderMenuOrFlagWithChildren(state, props, menu) {
  return menu.tag === FLAGS_FOR_LANG
    ? _renderFlagsWithChildren(state, props, menu)
    : _renderMenuWithChildren(state, props, menu)
  ;
}

/**
 * Renders a menu item.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @param {Array}           the menu,
 * @returns {XMLString}     returns the rendered data,
 * @since 0.0.0
 */
function _renderSimpleMenu(state, props, menu) {
  const cactive = state.activemenu === `${menu.lang}:${menu.name}` ? ' pure-menu-active' : ''
      , icon = menu.icon || ''
      ;

  return `
    <li data-menu="${menu.lang}:${menu.name}" class="pure-menu-item${cactive}">
      <a class="pure-menu-link" href="${menu.link}" target="_self">${icon}${menu.text}</a>
      <div class="bar"></div>
    </li>
  `;
}

/**
 * Renders the contents of the side menu.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @param {Array}           the menu,
 * @returns {XMLString}     returns the rendered data,
 * @since 0.0.0
 */
function _renderMenu(state, props, menu) {
  let li = '';
  for (let i = 0; i < menu.length; i++) {
    li += menu[i].children
      ? _renderMenuOrFlagWithChildren(state, props, menu[i])
      : _renderSimpleMenu(state, props, menu[i])
    ;
  }

  return li;
}

/**
 * Renders the side menu.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @param {Array}           the menu,
 * @returns {XMLString}     returns the rendered data,
 * @since 0.0.0
 */
function _render(state, props, menu) {
  return `
    <div class="menu pure-menu custom-restricted-width">
      <ul class="pure-menu-list">
        ${_renderMenu(state, props, menu)}
      </ul>
    </div>
  `;
}


// -- Public Static Methods ------------------------------------------------

const Render = {

  /**
   * Renders the side menu.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {Object}        the state properties,
   * @param {Object}        the optional properties,
   * @param {Array}         the menu,
   * @returns {XMLString}   returns the rendered data,
   * @since 0.0.0
   */
  render(state, props, menu) {
    return _render(state, props, menu);
  },
};


// -- Export
export default Render;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
