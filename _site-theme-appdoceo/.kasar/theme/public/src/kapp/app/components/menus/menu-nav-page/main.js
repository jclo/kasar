/** ************************************************************************
 *
 * Defines the page navigation component.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _listen                     listens component DOM events,
 *  . _findPreviousNextPages      finds the previous and next pages,
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
    , log       = KZlog('kapp:app:components:menus:menu-nav-page:main', level, false)
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
   * Listens for a click on next page.
   *
   */
  that.$().on('click', (e) => {
    if (e.target.classList.contains('nav-pagination-next')
      || e.target.parentNode.classList.contains('nav-pagination-next')
    ) {
      e.preventDefault();
      that.$emit('kapp:from:app:menu:nav:page:to:app:views:load:page', {
        direction: 'next',
        menu: that.state.next,
      });
    }
  });

  /**
   * Listens for a click on previous page.
   *
   */
  that.$().on('click', (e) => {
    if (e.target.classList.contains('nav-pagination-previous')
      || e.target.parentNode.classList.contains('nav-pagination-previous')
    ) {
      e.preventDefault();
      that.$emit('kapp:from:app:menu:nav:page:to:app:views:load:page', {
        direction: 'previous',
        menu: that.state.previous,
      });
    }
  });
}

/**
 * Finds the previous and next pages.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String}          the active language,
 * @param {String}          the active page,
 * @returns {Array}         returns previous and next pages,
 * @since 0.0.0
 */
function _findPreviousNextPages(lang, name, menu) {
  let previous
    , next
    ;

  if (menu && menu[lang]) {
    // flatten menu:
    const flatmenu = [];
    for (let i = 0; i < menu[lang].length; i++) {
      if (!menu[lang][i].children) {
        flatmenu.push(menu[lang][i]);
      } else {
        for (let j = 0; j < menu[lang][i].children.length; j++) {
          flatmenu.push(menu[lang][i].children[j]);
        }
      }
    }

    // Find active page:
    for (let i = 0; i < flatmenu.length; i++) {
      if (flatmenu[i].name === name) {
        next = flatmenu[i + 1];
        break;
      } else {
        previous = flatmenu[i];
      }
    }
  }

  return [previous, next];
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
    this.state.previous = false;
    this.state.next = false;
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
  render(state/* , props */) {
    const previoushide = !state.previous ? ' nav-pagination-hidden' : ''
        , previouslink = state.previous ? state.previous.link : '#'
        , previoustext = state.previous ? state.previous.text : '???'
        , nexthide     = !state.next ? ' nav-pagination-hidden' : ''
        , nextlink     = state.next ? state.next.link : '#'
        , nexttext     = state.next ? state.next.text : '???'
        ;

    return `
      <div class="nav-pagination">
        <div class="${previoushide}">
          <a href="${previouslink}">
            <div class= "nav-pagination-previous">
              <div>Previous</div>
              <div>${previoustext}</div>
            </div>
          </a>
        </div>

        <div class="${nexthide}">
          <a href="${nextlink}">
            <div class= "nav-pagination-next">
              <div>Next</div>
              <div>${nexttext}</div>
            </div>
          </a>
        </div>
      </div><!-- /.nav menu -->
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
    const [previous, next] = _findPreviousNextPages(lang, name, this.props.menu);
    this.$setState({ previous, next });
    return this;
  },
});


// Exports:
export default Menu;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
