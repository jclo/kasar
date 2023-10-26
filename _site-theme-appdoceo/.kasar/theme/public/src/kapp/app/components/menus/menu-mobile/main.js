/** ************************************************************************
 *
 * Defines the Mobile Side Menu Component.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _createMenu                 creates the mobile menu,
 *
 *
 * Overwritten Public Methods:
 *  . init                        initializes state and props,
 *  . events                      starts listening DOM events,
 *  . render                      returns the XMLString of the component,
 *
 *
 * Specific Public Methods:
 *  . isClose                     reports if the component is open or close,
 *  . open                        opens the component,
 *  . close                       closes the component,
 *  . update                      updates the active language and page,
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
import SideMenu from '../../../../_shared/components/sidemenu/main';
import L from './listen';


// -- Local Constants
const SWITCH_THEME = '#switchtheme'
    , LANG         = 'lang'
    , { level }    = config.logger
    , log          = KZlog('kapp:app:components:menus:menu-mobile:main', level, false)
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Creates the mobile menu from sidemenu.js and config.js.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @returns {Object}        returns the mobile menu,
 * @since 0.0.0
 */
/* eslint-disable no-restricted-syntax, guard-for-in */
function _createMenu(state, props) {
  const menu = {}
      ;

  if (props.sidemenu) {
    for (const lang in props.sidemenu) {
      if (!menu[lang]) menu[lang] = [];

      for (let i = 0; i < props.sidemenu[lang].length; i++) {
        // This is a pseudo clone because we clone only
        // the first level object and not the children.
        // But, it is sufficient for what we have to do.
        menu[lang].push({ ...props.sidemenu[lang][i] });
      }

      if (props.config && props.config && props.config.menu
          && props.config.menu[lang] && props.config.menu[lang].mobile
      ) {
        for (let i = 0; i < props.config.menu[lang].mobile.length; i++) {
          // We retrieve only the lang and theme from the mobile menu.
          if (props.config.menu[lang].mobile[i].tag === LANG) {
            menu[lang].push({ ...props.config.menu[lang].mobile[i] });
          } else if (props.config.menu[lang].mobile[i].link === SWITCH_THEME) {
            menu[lang].push({ ...props.config.menu[lang].mobile[i] });
          }
        }
      }
    }
  }

  return menu;
}
/* eslint-enable no-restricted-syntax, guard-for-in */


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
    this.state.theme = 'light';
    this.state.lang = 'en';
    this.state.open = false;

    this.props.menu = _createMenu(this.state, this.props);
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
    this._cosidemenu = this.$getChild('<SideMenu />');
    L.listen(this);
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
    const open = state.open ? ' mobilemenu-open' : '';

    this.children = {
      '<SideMenu />': { fn: SideMenu, props: { menu: props.menu } },
    };

    return `
      <div class="mobilemenu${open}">
        <div class="inner">
          <div class="menu pure-menu pure-menu-horizontal">
            <a class="pure-menu-heading" href="#">
              <span class="mobilemenu-logo"></span>
            </a>
          </div>
          <SideMenu />
        </div><!-- /.inner -->
      </div><!-- /.mobilemenu -->
    `;
  },
  /* eslint-enable no-param-reassign */


  // -- Specific Methods ---------------------------------------------------

  /**
   * Reports if the component is open or close.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Boolean}     returns true if the component is close,
   * @since 0.0.0
   */
  isClose() {
    return !this.state.open;
  },

  /**
   * Opens the component.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  open() {
    if (this.isClose()) {
      this.$setState({ open: true });
    }
    return this;
  },

  /**
   * Closes the component.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  close() {
    if (!this.isClose()) {
      this.$setState({ open: false });
    }
    return this;
  },

  /**
   * Updates the active language and page.
   *
   * @method (arg1, arg2)
   * @private
   * @param {String}        the new active language,
   * @param {String}        the new active page,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  update(lang, name) {
    this._cosidemenu.update(lang, name);
    return this;
  },
});


// Exports:
export default Menu;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
