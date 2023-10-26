/** ************************************************************************
 *
 * Defines the right vertical menu component.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _listen                     listens for a click event on the menu,
 *  . _createMenu                 creates new menu when new page loaded,
 *  . _renderContents             renders the contents of the menu,
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
    , log       = KZlog('kapp:app:components:menus:menu-vertical-right:main', level, false)
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Listens for a click event on the menu.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the menu component,
 * @returns {}              -,
 * @since 0.0.0
 */
function _listen(that) {
  that.$().on('click', (e) => {
    const { menu } = that.state
        , href = e.target.getAttribute('href')
        ;

    if (menu && href) {
      for (let i = 0; i < menu.length; i++) {
        menu[i].active = menu[i].link === href;
      }
      that.$setState({ menu });
    }
  });
}

/**
 * Creates the new menu when a new page is loaded.
 *
 * @function (arg1)
 * @private
 * @param {XMLString}       the new loaded page,
 * @returns {Array}         returns the generated menu,
 * @since 0.0.0
 */
function _createMenu(contents) {
  const LEVELS = 'h2, h3'
      , parser = new DOMParser()
      , doc    = parser.parseFromString(contents, 'text/html')
      , node   = doc.body.querySelectorAll(LEVELS)
      , menu   = []
      ;

  node.forEach((el, index) => {
    menu.push({
      tag: el.tagName.toLowerCase(),
      text: el.textContent,
      link: el.attributes.id ? `#${el.attributes.id.value}` : null,
      active: index === 0,
    });
  });

  return menu;
}

/**
 * Renders the contents of the menu.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @returns {XMLString}     returns the rendered data,
 * @since 0.0.0
 */
function _renderContents(state/* , props */) {
  const { menu } = state;

  if (menu) {
    let li = ''
      , href
      , target
      , active = ''
      ;

    for (let i = 0; i < menu.length; i++) {
      active = menu[i].active ? ' pure-menu-active' : '';
      href = menu[i].link ? menu[i].link : '#';
      target = menu[i].target ? menu[i].target : '_self';

      li += `
        <li class="${menu[i].tag} pure-menu-item${active}">
          <a class="pure-menu-link" href="${href}" target="${target}">${menu[i].text}</a>
        </li>
      `;
    }

    return `
      <div class="menu pure-menu">
        <ul class="pure-menu-list">
          ${li}
        </ul>
      </div>
    `;
  }

  return '';
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
    this.state.menu = null;
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
      <div class="menu pure-menu">
        ${_renderContents(state, props)}
      </div><!-- /.right side menu -->
    `;
  },


  // -- Specific Methods ---------------------------------------------------

  /**
   * Updates the menu.
   *
   * @method (arg1)
   * @public
   * @param {XMLString}     the new loaded page,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  update(contents) {
    this.$setState({ menu: _createMenu(contents) });
    return this;
  },
});


// Exports:
export default Menu;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
