/** ****************************************************************************
 *
 * Defines the content section of the web page.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _isMenuActive               checks if this menu is active,
 *  . _getSubmenu                 returns submenu,
 *  . _buildRightMenu             returns the right submenu,
 *  . _getSimpleMenu              returns a basic menu,
 *  . _getMenuWithChildren        returns a menu with children,
 *  . _getSidemenu                generates and returns the docmenu,
 *  . _getNav                     returns the sidebar section,
 *  . _getXmlSidemenu             returns the docmenu,
 *  . _getContents                returns the contents of the page,
 *
 *
 * Overwritten Public Methods:
 *  . render                      returns the XMLString of the component,
 *
 *
 * Specific Public Methods:
 *  . fill                        fills the content of the page,
 *  . getXmlSidemenu              returns the docmenu,
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

// -- Node modules
const RView = require('@mobilabs/rview')
    ;


// -- Local modules
const Breadcrumb = require('../menus/menu-breadcrumb/main')
    , BTDMenu    = require('../menus/menu-doc-pagination/main')
    ;


// -- Local constants


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Checks if this menu is active.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the menu,
 * @returns {Boolean}       returns true if the menu is active, otherwise false,
 * @since 0.0.0
 */
function _isMenuActive(menu) {
  if (menu) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].tag === 'youarehere') {
        return true;
      }
    }
    return false;
  }
  return false;
}

/**
 * Returns submenu.
 * (h2 and h3 levels)
 *
 * @function (arg1)
 * @private
 * @param {XMLString}       the content of the page,
 * @returns {Array}         returns the submenu,
 * @since 0.0.0
 */
function _getSubmenu(content) {
  const LEVELS = 'h2, h3'
      , parser = new DOMParser()
      , doc    = parser.parseFromString(content, 'text/html')
      , node   = doc.body.querySelectorAll(LEVELS)
      , menu   = []
      ;

  node.forEach((el) => {
    menu.push({
      tag: el.tagName.toLowerCase(),
      text: el.textContent,
      link: el.attributes.id ? `#${el.attributes.id.value}` : null,
    });
  });

  return menu;
}

/**
 * Returns the right submenu.
 *
 * @function (arg1)
 * @private
 * @param {XMLString}       the content of the page,
 * @returns {XMLString}     returns the submenu,
 * @since 0.0.0
 */
function _buildRightMenu(content) {
  const submenu = _getSubmenu(content);

  /**
   * Computes the submenu.
   */
  function get() {
    let s = ''
      , target
      , href
      , active
      ;

    for (let i = 0; i < submenu.length; i++) {
      active = i === 0 ? ' pure-menu-active' : '';
      href = submenu[i].link ? submenu[i].link : '#';
      target = submenu[i].target ? submenu[i].target : '_self';

      s += `
        <li class="${submenu[i].tag} pure-menu-item${active}">
          <a class="pure-menu-link" href="${href}" target="${target}">${submenu[i].text}</a>
        </li>
      `;
    }
    return s;
  }

  return `
    <div class="menu pure-menu">
      <ul class="pure-menu-list">
        ${get()}
      </ul>
    </div>
  `;
}

/**
 * Returns a basic menu.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the block menu,
 * @returns {XMLString}     return the menu,
 * @since 0.0.0
 */
function _getSimpleMenu(menu) {
  const active = menu.tag === 'youarehere' ? ' pure-menu-active' : '';

  return `
    <li class="pure-menu-item${active}">
      <a class="pure-menu-link" href="${menu.link}" target="_self">${menu.text}</a>
      <div class="bar"></div>
    </li>
  `;
}

/**
 * Returns a menu with children.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the block menu,
 * @returns {XMLString}     return the menu,
 * @since 0.0.0
 */
function _getMenuWithChildren(menu) {
  const expanded = menu.onlyExpanded ? ' pure-menu-only-expanded' : ''
      , active = _isMenuActive(menu.children) ? ' pure-menu-active' : ''
      ;

  let li = ''
    , child
    , cactive
    ;

  for (let i = 0; i < menu.children.length; i++) {
    child = menu.children[i];
    cactive = child.tag === 'youarehere' ? ' pure-menu-active' : '';

    li += `
      <li class="pure-menu-item${cactive}">
        <a class="pure-menu-link" href="${child.link}">${child.text}</a>
        <div class="bar"></div>
      </li>
    `;
  }

  const m = `
    <li class="pure-menu-item pure-menu-has-children${expanded}${active}">
      <a class="pure-menu-link" href="${menu.link}">${menu.text}</a>
      <ul class="pure-menu-children">
        ${li}
      </ul>
    </li>
  `;

  return m;
}

/**
 * Generates and returns the menu.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the block menu,
 * @returns {XMLString}     return the menu,
 * @since 0.0.0
 */
function _getSidemenu(docmenu) {
  let li = '';

  for (let i = 0; i < docmenu.length; i++) {
    li += docmenu[i].children
      ? _getMenuWithChildren(docmenu[i])
      : _getSimpleMenu(docmenu[i])
    ;
  }

  return li;
}

/**
 * Returns the sidebar section.
 *
 * @function (arg1, arg2)
 * @private
 * @param {XMLString}       the content of the page,
 * @param {Array}           the docmenu,
 * @returns {XMLString}     returns the sidebar section,
 * @since 0.0.0
 */
function _getNav(content, docmenu) {
  return `
    <div class="doc-content-nav-sidebar">
      <div class="doc-content-nav-sidebar-menu">
        <div class="menu pure-menu custom-restricted-width">
          <ul class="pure-menu-list">
            <!-- menu here -->
            ${_getSidemenu(docmenu)}
          </ul>
        </div>
      </div>
    </div>
  `;
}

/**
 * Returns the docmenu.
 *
 * @function (arg1)
 * @private
 * @param {Array}         the docmenu,
 * @returns {XMLString}   returns the docmenu,
 * @since 0.0.0
 */
function _getXmlSidemenu(docmenu) {
  return `
    <ul class="pure-menu-list doc-mobile-nav-sidebar-menu">
      ${_getSidemenu(docmenu)}
    </ul>
  `;
}

/**
 * Returns the contents of the page.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {XMLString}       the left menu,
 * @param {XMLString}       the content of the page,
 * @param {XMLString}       the submenu (the anchor points in the page),
 * @returns {XMLString}     returns the page,
 * @since 0.0.0
 */
function _getContents(menu, content, submenu) {
  return `
    <aside>
      <div>
        <div>
          ${menu || '<!-- empty -->'}
        </div>
      </div>
    </aside>

    <main>
      <div class="container">
        <div class="row">
          <div class="leftcol">
            <Breadcrumb />
            ${content || '<!-- empty -->'}
            <BTDMenu />
          </div>
          <div class="rightcol">
            <div>
              ${submenu || '<!-- empty -->'}
            </div>
          </div>
        </div>
      </div><!-- /.container -->
    </main>
  `;
}


// -- Public -------------------------------------------------------------------

const Content = RView.Component({

  // -- Overwritten Methods ----------------------------------------------------

  events() {
    this.breadcrumb = this.$getChild('<Breadcrumb />');
    this.pagenavmenu = this.$getChild('<BTDMenu />');
  },

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
    this.children = {
      '<Breadcrumb />': Breadcrumb,
      '<BTDMenu />': BTDMenu,
    };

    return `
      <div class="content doc ${state.level || ''}">
        ${state.structure || ''}
      </div>
    `;
  },


  // -- Specific Methods -------------------------------------------------------

  /**
   * Fills the content of the page.
   *
   * @method (arg1, arg2)
   * @public
   * @param {XMLString}     the content of the page,
   * @param {Array}         the docmenu,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  fill(content, docmenu, homelink) {
    this.$setState({
      structure: _getContents(_getNav(content, docmenu), content, _buildRightMenu(content)),
    });
    this.breadcrumb.fill(docmenu, homelink);
    this.pagenavmenu.fill(docmenu);
    return this;
  },

  /**
   * Returns the docmenu.
   *
   * @method (arg1)
   * @public
   * @param {Array}         the docmenu,
   * @returns {XMLString}   returns the docmenu,
   * @since 0.0.0
   */
  getXmlSidemenu(docmenu) {
    return _getXmlSidemenu(docmenu);
  },
});


// -- Export
module.exports = Content;
