/** ************************************************************************
 *
 * Defines the Breadcrumb menu Component.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _listen                     listens component DOM events,
 *  . _extractMenu                creates the breadcrumb menu,
 *  . _renderMenu                 renders the breadcrumb menu,
 *
 *
 * Overwritten Public Methods:
 *  . init                        initializes state and props,
 *  . events                      starts listening DOM events,
 *  . render                      returns the XMLString of the component,
 *
 *
 * Specific Public Methods:
 *  . update                      updates the menu,
 *
 *
 *
 * @namespace -
 * @exports   -
 * @author    -
 * @since     0.0.0
 * @version   -
 * ********************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules
import RView from '@mobilabs/rview';
import KZlog from '@mobilabs/kzlog';


// -- Local Modules
import config from '../../../../config';


// -- Local Constants
const { level } = config.logger
    , log       = KZlog('kapp:app:components:menus:menu-breadcrumb:main', level, false)
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Listens component DOM events.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the component object,
 * @returns {}              -,
 * @since 0.0.0
 */
function _listen(that) {
  /**
   * Listens for a click on the breadcrumb menu.
   *
   */
  that.$().on('click', (e) => {
    if (e.target.tagName === 'I') {
      e.preventDefault();
      const [lang, name] = e.target.parentNode.parentNode.getAttribute('data-menu').split(':');
      const link = e.target.parentNode.getAttribute('href');
      if (lang && name && link) {
        that.$emit('kapp:from:app:menu:breadcrumb:to:app:views:load:page', { lang, name, link });
      }
      return;
    }

    if (e.target.classList.contains('pure-menu-link')
      && e.target.parentNode.classList.contains('pure-menu-item')
      && !e.target.parentNode.classList.contains('pure-menu-disabled')
    ) {
      e.preventDefault();
      const [lang, name] = e.target.parentNode.getAttribute('data-menu').split(':');
      const link = e.target.getAttribute('href');
      if (lang && name && link) {
        that.$emit('kapp:from:app:menu:breadcrumb:to:app:views:load:page', { lang, name, link });
      }
      return;
    }

    if (e.target.classList.contains('pure-menu-link')
      && e.target.parentNode.classList.contains('pure-menu-item')
      && e.target.parentNode.classList.contains('pure-menu-disabled')
    ) {
      e.preventDefault();
    }
  });
}

/**
 * Creates the breadcrumb menu.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @returns {Array}         returns menu,
 * @since 0.0.0
 */
function _extractMenu(state, props) {
  const menu = props.menu[state.lang];

  let home
    , previous
    , match
    ;

  // search for the active menu:
  for (let i = 0; i < menu.length; i++) {
    if (!menu[i].children) {
      if (i === 0) home = menu[i];

      if (menu[i].name === state.name) {
        previous = null;
        match = menu[i];
        break;
      }
    } else {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (i === 0 && j === 0) home = menu[i].children[j];

        if (menu[i].children[j].name === state.name) {
          previous = {
            name: menu[i].children[0].name,
            text: menu[i].text,
            link: menu[i].children[0].link,
          };
          match = menu[i].children[j];
          break;
        }
      }
    }
  }

  if (previous) {
    return [
      home,
      `
        <li class="pure-menu-item"><span class="breadcrumb-icons breadcrumb-right-arrow"></span></li>
        <li data-menu="${state.lang}:${previous.name}" class="pure-menu-item">
          <a class="pure-menu-link" href="${previous.link}">${previous.text}</a>
        </li>
        <li class="pure-menu-item"><span class="breadcrumb-icons breadcrumb-right-arrow"></span></li>
        <li data-menu="${state.lang}:${match.name}" class="pure-menu-item pure-menu-disabled">
          <a class="pure-menu-link" href="${match.link}">${match.text}</a>
        </li>
      `,
    ];
  }

  return [
    home,
    `
      <li class="pure-menu-item"><span class="breadcrumb-icons breadcrumb-right-arrow"></span></li>
      <li data-menu="${state.lang}:${match.name}" class="pure-menu-item pure-menu-disabled">
        <a class="pure-menu-link" href="${match.link}">${match.text}</a>
      </li>
    `,
  ];
}

/**
 * Renders the breadcrumb menu.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @returns {XMLString}     returns the rendered data,
 * @since 0.0.0
 */
function _renderMenu(state, props) {
  let home    = { name: '???', link: '#???' }
    , submenu = ''
    ;

  if (props.menu && props.menu[state.lang]) {
    [home, submenu] = _extractMenu(state, props);
  }

  return `
    <li data-menu="${state.lang || '???'}:${home.name}" class="pure-menu-item">
      <a class="nav pure-menu-link" href="${home.link}"><i class="fa-solid fa-house"></i></a>
    </li>
    ${submenu}
  `;
}


// -- Public ---------------------------------------------------------------

const Menu = RView.Component({

  // -- Overwritten Methods ------------------------------------------------

  /**
   * Initializes state and props.
   * (executed before the component is rendered in the DOM)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  init() {
    log.trace('menu component created!');
    this.state.lang = false;
    this.state.name = false;
    return this;
  },

  /**
   * Starts DOM events.
   * (executed after the component is rendered in the DOM)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  events() {
    _listen(this);
    return this;
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
  render(state, props) {
    return `
      <div class="breadcrumb menu pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
        ${_renderMenu(state, props)}
      </ul>
      </div><!-- /.breadcrumb -->
    `;
  },


  // -- Specific Methods ---------------------------------------------------

  /**
   * Updates the menu.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the active language,
   * @param {String}        the active page,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  update(lang, name) {
    this.$setState({ lang, name });
    return this;
  },

});


// Exports:
export default Menu;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
