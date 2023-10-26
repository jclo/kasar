/** ************************************************************************
 *
 * Defines the Top Right Menu Component.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _listen                     listens component DOM events,
 *  . _extractMenu                extracts the menu from config.js,
 *
 *
 * Overwritten Public Methods:
 *  . init                        initializes state and props,
 *  . events                      starts listening DOM events,
 *  . render                      returns the XMLString of the component,
 *
 *
 * Specific Public Methods:
 *  . setLang                     updates the language,
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
import U from '../menu-utils/util1';


// -- Local Constants
const THEME_COLOR  = 'theme-color-icons'
    , THEME_SWITCH = '#switchtheme'
    , { level }    = config.logger
    , log          = KZlog('kapp:app:components:menus:menu-top-right:main', level, false)
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
   * Listen for a click on the theme icon.
   *
   */
  that.$().on('click', (e) => {
    if (e.target.classList.contains(THEME_COLOR)
      && e.target.parentNode.getAttribute('href') === THEME_SWITCH
    ) {
      that.$emit('kapp:from:app:menus:menu-top-right:to:app:views:switch:theme');
    }
  });

  /**
   * Listen for a click on the language menu.
   *
   */
  that.$().on('click', (e) => {
    if (e.target.classList.contains('nav')
      && e.target.classList.contains('pure-menu-link')
      && (!e.target.getAttribute('href') || e.target.getAttribute('href') === '#')
    ) {
      e.preventDefault();
      return;
    }

    if (e.target.classList.contains('nav')
      && e.target.classList.contains('pure-menu-link')
      && e.target.parentNode.classList.contains('pure-menu-item')
      && e.target.parentNode.parentNode.classList.contains('pure-menu-children-orient-up')
    ) {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      if (href) {
        const a = href.split('/');
        if (a.length < 2 || a[a.length - 2] === that.state.lang) {
          return;
        }

        that.$emit('kapp:from:app:menus:menu-top-right:to:app:views:set:lang', { lang: a[a.length - 2] });
      }
    }
  });
}

/**
 * Extracts the menu from config.js.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @returns {Array}         returns the top right menu,
 * @since 0.0.0
 */
function _extractMenu(state, props) {
  if (props.config
      && props.config.menu
      && props.config.menu[state.lang]
      && props.config.menu[state.lang].top
      && props.config.menu[state.lang].top.right
  ) {
    return props.config.menu[state.lang].top.right;
  }

  return [];
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
    this.state.lang = 'en';
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
  /* eslint-disable no-param-reassign */
  render(state, props) {
    const menu = _extractMenu(state, props);

    return `
      <div class="menu pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          ${U.getMenu(menu)}
        </ul>
      </div><!-- /.top right menu -->
    `;
  },
  /* eslint-enable no-param-reassign */


  // -- Specific Methods ---------------------------------------------------

  /**
   * Updates the language.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the active language,
   * @param {String}        the page name,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  setLang(lang) {
    this.$setState({ lang });
    return this;
  },
});


// Exports:
export default Menu;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
