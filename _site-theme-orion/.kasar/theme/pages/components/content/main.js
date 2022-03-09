// ESLint declarations
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */

'use strict';

// -- Node modules
const RView = require('@mobilabs/rview')
    ;


// -- Local modules


// -- Local constants


// -- Local variables


// -- Private Function(s) ------------------------------------------------------

/**
 * Defines the content structure of the front web page.
 *
 * @function (arg1)
 * @private
 * @param {XMLString}       the HTML content,
 * @returns {String}        returns the HTML content structure,
 * @since 0.0.0
 */
function _getFront(content) {
  return `
    <div class="front">
      ${content || '<!-- empty -->'}
    </div>
  `;
}

/**
 * Defines the content structure of the internal web pages.
 *
 * @function (arg1, arg2)
 * @private
 * @param {XMLString}       the HTML content,
 * @param {XMLString}       the HTML left side menu content,
 * @returns {String}        returns the content HTML structure,
 * @since 0.0.0
 */
function _getInternal(content, sidemenu) {
  return `
    <div class="internal container">
      <div class="menu pure-menu pure-menu-horizontal">
        <!-- menu here -->
      </div>
      <!-- gitbon here -->
      <!-- Grid -->
      <div class="pure-g">
        <!-- Left Column -->
        <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-6-24">
          <div class="column left">
            <div class="menu pure-menu custom-restricted-width">
              <ul class="pure-menu-list">
                <!-- menu here -->
                ${sidemenu}
              </ul>
            </div><!-- /.sidemenu -->
          </div>
        </div><!-- /.left column -->

        <!-- Main section -->
        <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-18-24">
          <div class="column right">
            <noscript>
              Your browser does not support JavaScript. It is required to load pages!
            </noscript>
              <!-- content here -->
              ${content}
            </div>
        </div><!-- /.right column -->
      </div><!-- /.grid -->
    </div><!-- /.internal -->
  `;
}

/**
 * Builds the submenu.
 *
 * @function (arg1, arg2)
 * @private
 * @param {XMLString}       the HTML content,
 * @param {String}          the submenu level (h2, h2-h3, etc.),
 * @returns {Array}         returns the submenu,
 * @since 0.0.0
 */
function _getSubMenu(content, levels) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const nodelist = doc.body.querySelectorAll(levels);
  const menu = [];
  nodelist.forEach((el) => {
    menu.push({
      tag: el.tagName.toLowerCase(),
      text: el.textContent,
      link: el.attributes.id ? `#${el.attributes.id.value}` : null,
    });
  });
  return menu;
}

/**
 * Returns the 'active' class for the menu.
 *
 * Nota:
 * The menu is considered active if a children owns the tag 'youarehere'.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the list of children,
 * @returns {String}        returns the appropriate 'active' class,
 * @since 0.0.0
 */
function _isMenuActive(child) {
  if (child) {
    for (let i = 0; i < child.length; i++) {
      if (child[i].tag === 'youarehere') {
        return 'pure-menu-active';
      }
    }
    return '';
  }
  return '';
}

/**
 * Builds the submenu.
 *
 * @function (arg1)
 * @private
 * @param {array}           the submenu structure,
 * @returns {XMLString}     returns the submenu,
 * @since 0.0.0
 */
function _buildSubMenu(submenu) {
  let sub
    , target
    , href
    ;

  sub = '<ul class="pure-menu-item">';
  for (let i = 0; i < submenu.length; i++) {
    href = submenu[i].link ? submenu[i].link : '#';
    target = submenu[i].target ? submenu[i].target : '_self';
    sub += `
      <li class="${submenu[i].tag} pure-menu-item">
        <a class="pure-menu-link" href="${href}" target="${target}">${submenu[i].text}</a>
      </li>
    `;
  }
  sub += '</ul>';
  return sub;
}

/**
 * Builds the local menu.
 *
 * @function (arg1)
 * @private
 * @param {array}           the local menu structure,
 * @returns {XMLString}     returns the local menu,
 * @since 0.0.0
 */
function _buildLocalMenu(menu) {
  let sub
    , href
    ;

  sub = '';
  for (let i = 0; i < menu.length; i++) {
    href = menu[i].link ? menu[i].link : '#';
    sub += `
      <li class="${menu[i].tag} pure-menu-item">
        <a class="pure-menu-link" href="${href}">${menu[i].text}</a>
      </li>
    `;
  }
  return sub;
}

/**
 * Builds the children menu.
 *
 * @function (arg1, arg2)
 * @private
 * @param {array}           the children structure,
 * @param {array}           the children submenu structure,
 * @returns {XMLString}     returns the children menu,
 * @since 0.0.0
 */
function _getChildren(menu, submenu) {
  let s = ''
    , child
    , href
    , target
    , active
    ;

  for (let i = 0; i < menu.children.length; i++) {
    child = menu.children[i];
    href = child.link ? child.link : '#';
    target = child.target ? child.target : '_self';
    active = child.tag === 'youarehere' ? 'pure-menu-active' : '';

    s += `
      <li class="${child.tag} pure-menu-item ${active}">
        <a class="pure-menu-link" href="${href}" target="${target}">${child.text}</a>
        ${child.tag === 'youarehere' ? _buildSubMenu(submenu) : '<!-- submenu here -->'}
      </li>
    `;
  }
  return s;
}

/**
 * Builds a fragement of the menu.
 *
 * @function (arg1, arg2)
 * @private
 * @param {array}           the children structure,
 * @param {array}           the children submenu structure,
 * @returns {XMLString}     returns the fragment menu,
 * @since 0.0.0
 */
function _getMenuFragment(menu, submenu) {
  let classes = menu.tag ? menu.tag : '';
  classes += ' pure-menu-item  pure-menu-has-children';
  classes += menu.onlyExpanded ? ' pure-menu-only-expanded' : '';
  classes += ` ${_isMenuActive(menu.children)}`;

  return `
    <li class="${classes}">
      <a class="pure-menu-link" href="${menu.link ? menu.link : '#'}">${menu.text}</a>
      <ul class="pure-menu-children">
        ${_getChildren(menu, submenu)}
      </ul>
    </li>
  `;
}

/**
 * Builds the vertical left side menu.
 *
 * @function (arg1, arg2)
 * @private
 * @param {array}           the menu structure,
 * @param {array}           the children submenu structure,
 * @returns {XMLString}     returns the menu,
 * @since 0.0.0
 */
function _getMenu(sidemenu, submenu) {
  let smenu = '';
  if (sidemenu) {
    for (let i = 0; i < sidemenu.length; i++) {
      smenu += _getMenuFragment(sidemenu[i], submenu);
    }
  } else if (submenu) {
    smenu = _buildLocalMenu(submenu);
  }
  return smenu;
}


// -- Public Function(s) -------------------------------------------------------


/**
 * Defines the web component.
 *
 * @function ()
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
const Content = RView.Component({

  /**
   * Inserts the content structure of the frontpage
   * inside the DOM.
   */
  setFront() {
    this.$setState({ content: _getFront() });
    return this;
  },

  /**
   * Inserts the content structure of the internal pages
   * inside the DOM.
   */
  setInternal() {
    this.$setState({ content: _getInternal() });
    return this;
  },

  /**
   * Fills the content.
   */
  fillFront(content) {
    this.$setState({ content: _getFront(content) });
    return this;
  },

  /**
   * Fills the content.
   */
  fillInternal(content, sidemenu, submenu) {
    this.$setState({ content: _getInternal(content, _getMenu(sidemenu, submenu)) });
    return this;
  },

  /**
   * Returns a menu built from the structure of the page.
   */
  getSubMenu(content, levels) {
    if (content && typeof content === 'string'
      && levels && typeof levels === 'string') {
      return _getSubMenu(content, levels);
    }
    return [];
  },

  /**
   * Renders the web component.
   */
  render(state) {
    return `
    <div class="content">
      ${state.content || '<!-- empty -->'}
    </div>
    `;
  },
});


// -- Export
module.exports = Content;
