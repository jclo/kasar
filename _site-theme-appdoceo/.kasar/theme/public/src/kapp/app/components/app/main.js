/** ************************************************************************
 *
 * Defines the KApp Web App Component.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _move2Top                   moves the page to the top when new content is loaded,
 *  . _freezePage                 moves page to top and removes scrolling,
 *  . _setTheme                   sets the DOM HTML data-theme attribute,
 *
 *
 * Overwritten Public Methods:
 *  . init                        initializes state and props,
 *  . events                      starts listening DOM events,
 *  . render                      returns the XMLString of the component,
 *
 *
 * Specific Public Methods:
 *  . loadPage                    loads the requested page,
 *  . menuOpen                    opens the menu,
 *  . menuClose                   closes the menu,
 *  . setTheme                    sets the light/dark theme,
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
import config from '../../../config';
import Header from '../header/main';
import MobileMenu from '../menus/menu-mobile/main';
import Contents from '../contents/main';
import Footer from '../footer/main';


// -- Local Constants
const CSS_ID    = '#highlight-color-theme'
    , CSS_DARK  = 'atom-one-dark.min.css'
    , CSS_LIGHT = 'atom-one-light.min.css'
    , { level } = config.logger
    , log       = KZlog('kapp:app:components:app:main', level, false)
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Moves the page to the top when new content is loaded.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _move2Top() {
  window.scrollTo(0, 0);
}

/**
 * Moves page to top and removes scrolling.
 *
 * @function (arg1)
 * @private
 * @param {String}          the theme,
 * @returns {}              -,
 * @since 0.0.0
 */
function _freezePage(freeze) {
  if (freeze) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      document.body.classList.add('freeze');
    }, 10);
    return;
  }

  document.body.classList.remove('freeze');
}

/**
 * Sets the DOM HTML data-theme attribute.
 *
 * @function (arg1)
 * @private
 * @param {String}          the theme,
 * @returns {}              -,
 * @since 0.0.0
 */
function _setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const css = document.querySelector(CSS_ID);
  if (css) {
    const apath = css.getAttribute('href').split('/');

    if (apath && Array.isArray(apath)) {
      apath[apath.length - 1] = theme === 'dark'
        ? CSS_DARK
        : CSS_LIGHT
      ;
      const np = apath.join('/');
      css.setAttribute('href', np);
    }
  }
}


// -- Public ---------------------------------------------------------------

const App = RView.Component({

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
    log.trace('app component created!');
    this.props.hello = '(with {{lib:name}} v{{lib:version}})';
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
    this._coheader = this.$getChild('<Header />');
    this._comobile = this.$getChild('<MobileMenu />');
    this._cocontents = this.$getChild('<Contents />');
    this._cofooter = this.$getChild('<Footer />');
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
    this.children = {
      '<Header />': { fn: Header, props: { config: props.config } },
      '<MobileMenu />': { fn: MobileMenu, props: { config: props.config, sidemenu: props.sidemenu } },
      '<Contents />': { fn: Contents, props: { menu: props.sidemenu } },
      '<Footer />': { fn: Footer, props: { config: props.config } },
    };

    return `
      <div>
        <Header />
        <MobileMenu />
        <Contents />
        <Footer />
      </div>
    `;
  },


  // -- Specific Methods ---------------------------------------------------

  /**
   * Loads the requested page.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {String}        the active language,
   * @param {String}        the active page,
   * @param {XMLString}     the page contents,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  loadPage(lang, name, data) {
    this._cocontents.loadPage(lang, name, data);
    this._comobile.update(lang, name);
    this._coheader.setLang(lang);
    this._cofooter.setLang(lang);
    _move2Top();
    return this;
  },

  /**
   * Opens the menu.
   * (mobile menu and menu button)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  menuOpen() {
    this._comobile.open();
    this._coheader.menubuttonOpen();
    _freezePage(true);
    return this;
  },

  /**
   * Closes the menu.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  menuClose() {
    this._comobile.close();
    this._coheader.menubuttonClose();
    _freezePage(false);
    return this;
  },

  /**
   * Sets the light/dark theme.
   *
   * @method (arg1)
   * @public
   * @param {String}        the requested theme (light or dark),
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  setTheme(theme) {
    _setTheme(theme);
    this.menuClose();
    return this;
  },
});


// Exports:
export default App;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
