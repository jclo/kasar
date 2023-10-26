/** ************************************************************************
 *
 * Defines the MButton component.
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
 *  . render                      renders the component,
 *
 *
 * Specific Public Methods:
 *  . isClose                     reports if the component is open or close,
 *  . open                        opens the component,
 *  . close                       closes the component,
 *
 *
 * Overwritable Public Methods:
 *  . none,
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


// -- Local Constants
const VERSION   = '2.0.0'
    , { level } = config.logger
    , log       = KZlog('_shared:components:menubutton:main', level, false)
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------
// none,


// -- Public ---------------------------------------------------------------

const MButton = RView.Component({

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
    log.trace('shared menubutton component created!');
    this.state.open = false;
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
    this.$().on('click', (/* e */) => {
      this.$emit(`_shared:from:menubutton:to:${this.props.owner}:views:toggle`, {
        open: !this.state.open,
        callback: (() => {
          this.$setState({ open: !this.state.open });
        }),
      });
    });
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
  render(state/* , props */) {
    const open = state.open ? ' shared-component-menubutton-icon-open' : '';

    return `
      <div class="shared-component-menubutton" data-version="${VERSION}">
        <span class="shared-component-menubutton-icon${open}"></span>
      </div>
    `;
  },


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


  // -- Overwritable Methods -----------------------------------------------
  // none,
});


// Exports:
export default MButton;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
