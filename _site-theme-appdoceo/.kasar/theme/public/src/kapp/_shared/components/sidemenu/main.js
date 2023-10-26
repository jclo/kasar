/** ************************************************************************
 *
 * Defines the Side Menu component.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _extractMenu                extracts the menu from sidemenu.js,
 *  . _setActiveMenu              sets the default active menu,
 *
 *
 * Overwritten Public Methods:
 *  . init                        initializes state and props,
 *  . events                      starts listening DOM events,
 *  . render                      renders the component,
 *
 *
 * Specific Public Methods:
 *  . update                      updates the active language and page,
 *
 *
 * Overwritable Public Methods:
 *  . _listenDOMEvents            performs operations on generic DOM events,
 *  . _events                     performs custom operations on events,
 *  . _renderContents             renders the contents,
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
import L from './generic/listen';
import R from './generic/render';


// -- Local Constants
const VERSION   = '2.0.0'
    , { level } = config.logger
    , log       = KZlog('_shared:components:sidemenu:main', level, false)
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Extracts the menu from sidemenu.js.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @returns {Array}         returns the bottom right menu,
 * @since 0.0.0
 */
function _extractMenu(state, props) {
  const menu = props.menu && props.menu[state.lang]
    ? props.menu[state.lang]
    : {}
  ;

  return menu;
}

/**
 * Sets the default active menu.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @returns {Array}         returns the bottom right menu,
 * @since 0.0.0
 */
function _setActiveMenu(state, props) {
  let activemenu = null;

  if (props.menu && props.menu[state.lang]) {
    activemenu = props.menu[state.lang][0].children
      ? `${state.lang}:${props.menu[state.lang][0].children[0].name}`
      : `${state.lang}:${props.menu[state.lang][0].name}`
    ;
  }

  return activemenu;
}


// -- Public ---------------------------------------------------------------

const SMenu = RView.Component({

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
    log.trace('shared sidemenu component created!');
    this.state.lang = 'en';
    this.state.openmenu = [];
    this.state.activemenu = _setActiveMenu(this.state, this.props);
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
    this._listenDOMEvents(this);
    this._events();
    return this;
  },

  /**
   * Renders the component.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the state properties,
   * @param {Object}        the optional properties,
   * @returns {XMLString}   returns the rendered component,
   * @since 0.0.0
   */
  render(state, props) {
    const menu = _extractMenu(state, props);

    return `
      <div class="shared-component-sidemenu" data-version="${VERSION}">
        ${this._renderContents(state, props, menu)}
      </div>
    `;
  },


  // -- Specific Methods ---------------------------------------------------

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
    this.$setState({ lang, activemenu: `${lang}:${name}` });
    return this;
  },


  // -- Overwritable Methods -----------------------------------------------

  /**
   * Performs operations on generic DOM events.
   * (private method, do not call it!)
   *
   * @method ()
   * @private
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  _listenDOMEvents() {
    L.listenDOMEvents(this);
    return this;
  },

  /**
   * Performs custom operations on events.
   * (private method, do not call it!)
   *
   * @method ()
   * @private
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  _events() {
    L.listen(this);
    return this;
  },

  /**
   * Renders the contents.
   * (private method, do not call it!)
   *
   * @method (arg1, arg2)
   * @private
   * @param {Object}        the state properties,
   * @param {Object}        the optional properties,
   * @returns {XMLString}   returns the rendered data,
   * @since 0.0.0
   */
  _renderContents(state, props, menu) {
    return R.render(state, props, menu);
  },
});


// Exports:
export default SMenu;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
