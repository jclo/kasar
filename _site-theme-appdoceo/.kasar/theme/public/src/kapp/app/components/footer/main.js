/** ************************************************************************
 *
 * Defines the Web Footer Component.
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
import BRMenu from '../menus/menu-bottom-right/main';


// -- Local Constants
const { level } = config.logger
    , log       = KZlog('kapp:app:components:footer:main', level, false)
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------
// none,


// -- Public ---------------------------------------------------------------

const Footer = RView.Component({

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
    log.trace('footer component created!');
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
    this._cobrmenu = this.$getChild('<BRMenu />');
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
    const copyright = props.config && props.config.company && props.config.company.copyright
      ? props.config.company.copyright.replace(/{{copyright:year}}/, (new Date()).getFullYear())
      : 'unknown copyright'
    ;

    this.children = { '<BRMenu />': { fn: BRMenu, props: { config: props.config } } };

    return `
      <footer>
        <div class="container">
          <div>
            <p class="copyright">${copyright}</p>
          </div>
          <div>
            <BRMenu />
          </div>
        </div>
    `;
  },


  // -- Specific Methods ---------------------------------------------------

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
    this._cobrmenu.setLang(lang);
    return this;
  },
});


// Exports:
export default Footer;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
