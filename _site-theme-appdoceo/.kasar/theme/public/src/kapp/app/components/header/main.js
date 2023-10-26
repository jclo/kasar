/** ************************************************************************
 *
 * Defines the Web Header Component.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _listen                     listens DOM events,
 *
 *
 * Overwritten Public Methods:
 *  . init                        initializes state and props,
 *  . events                      starts listening DOM events,
 *  . render                      returns the XMLString of the component,
 *
 *
 * Specific Public Methods:
 *  . menubuttonOpen              opens the menu button,
 *  . menubuttonClose             closes the menu button,
 *  . setLang                     updates the active language,
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
import TLMenu from '../menus/menu-top-left/main';
import TRMenu from '../menus/menu-top-right/main';
import MenuButton from '../../../_shared/components/menubutton/main';


// -- Local Constants
const { level } = config.logger
    , log       = KZlog('kapp:app:components:header:main', level, false)
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Listens DOM events.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the component object,
 * @returns {}              -,
 * @since 0.0.0
 */
function _listen(that) {
  that.$().on('click', (e) => {
    if (e.target.tagName === 'SPAN'
      && e.target.parentNode.classList.contains('pure-menu-heading')
    ) {
      that.$emit('kapp:from:app:header:logo:to:app:views:go:home');
    }
  });
}


// -- Public ---------------------------------------------------------------

const Header = RView.Component({

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
    log.trace('header component created!');
    this.props.title = '{{lib:name}}';
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
    this._cotlmenu = this.$getChild('<TLMenu />');
    this._cotrmenu = this.$getChild('<TRMenu />');
    this._comenubutton = this.$getChild('<MenuButton />');
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
    this.children = {
      '<TLMenu />': { fn: TLMenu, props: { config: props.config } },
      '<TRMenu />': { fn: TRMenu, props: { config: props.config } },
      '<MenuButton />': { fn: MenuButton, props: { owner: 'app:header' } },
    };

    return `
      <header class="navbar-fixed-top">
        <div class="navbar">
          <div class="container">
            <div class="menu pure-menu pure-menu-horizontal">
              <a class="pure-menu-heading" href="#"><span class="header-logo"></span></a>
            </div>
            <div class="top-left-menu">
              <TLMenu />
            </div>
            <div class="top-right-menu">
              <TRMenu />
            </div>
            <div class="mobilemenu-button">
              <MenuButton />
            </div>
          </div><!-- /.container -->
        </div><!-- /. navbar -->
      </header><!-- /.header -->
    `;
  },


  // -- Specific Methods ---------------------------------------------------

  /**
   * Opens the menu button.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  menubuttonOpen() {
    this._comenubutton.open();
    return this;
  },

  /**
   * Closes the menu button.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  menubuttonClose() {
    this._comenubutton.close();
    return this;
  },

  /**
   * Updates the active language.
   *
   * @method (arg1)
   * @public
   * @param {String}        the active language,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  setLang(lang) {
    this._cotrmenu.setLang(lang);
    return this;
  },
});


// Exports:
export default Header;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
