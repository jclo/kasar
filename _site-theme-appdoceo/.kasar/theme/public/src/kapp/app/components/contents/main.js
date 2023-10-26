/** ************************************************************************
 *
 * Defines the Web Contents Component.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . none,
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
import VLMenu from '../../../_shared/components/sidemenu/main';
import Breadcrumb from '../menus/menu-breadcrumb/main';
import NavMenu from '../menus/menu-nav-page/main';
import VRMenu from '../menus/menu-vertical-right/main';


// -- Local Constants
const { level } = config.logger
    , log       = KZlog('kapp:app:components:contents:main', level, false)
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------
// none,


// -- Public ---------------------------------------------------------------

const Contents = RView.Component({

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
    log.trace('contents component created!');
    this.state.page = 'empty!!!';
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
    this._covlmenu = this.$getChild('<VLMenu />');
    this._cobreadcrumb = this.$getChild('<Breadcrumb />');
    this._conavmenu = this.$getChild('<NavMenu />');
    this._covrmenu = this.$getChild('<VRMenu />');
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
      '<VLMenu />': { fn: VLMenu, props: { menu: props.menu } },
      '<Breadcrumb />': { fn: Breadcrumb, props: { menu: props.menu } },
      '<NavMenu />': { fn: NavMenu, props: { menu: props.menu } },
      '<VRMenu />': { fn: VRMenu, props: { } },
    };

    return `
      <div class="contents">
        <aside>
          <div>
            <div>
              <VLMenu />
            </div>
          </div>
        </aside>
        <main class="container">
          <div class="row">
            <div class="leftcol">
              <Breadcrumb />
              <div>${state.page}</div>
              <NavMenu />
            </div>
            <div class="rightcol">
              <div>
                <VRMenu />
              </div>
            </div>
          </div>
        </main>
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
    this.$setState({ page: data });
    this._covlmenu.update(lang, name);
    this._cobreadcrumb.update(lang, name);
    this._covrmenu.update(data);
    this._conavmenu.update(lang, name);

    window.hljs.highlightAll(); // !!!!!!!!!!!!!!!!!!!!!
    return this;
  },
});


// Exports:
export default Contents;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
