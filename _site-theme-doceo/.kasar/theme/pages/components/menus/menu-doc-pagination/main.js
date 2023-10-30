/** ****************************************************************************
 *
 * Defines the menu at the bottom content of the doc page.
 * (previous, next)
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Overwritten Public Methods:
 *  . render                      returns the XMLString of the component,
 *
 *
 * Specific Public Methods:
 *  . set                         updates the menu,
 *
 *
 *
 * @namespace -
 * @exports   -
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle,
  import/no-extraneous-dependencies */

'use strict';

// -- Vendor Modules
const RView = require('@mobilabs/rview');


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Private Functions --------------------------------------------------------


function _set(docmenu) {
  const flatdocmenu = [];

  let previous
    , next
    ;

  // flatten doc menu:
  for (let i = 0; i < docmenu.length; i++) {
    if (!docmenu[i].children) {
      flatdocmenu.push(docmenu[i]);
    } else {
      for (let j = 0; j < docmenu[i].children.length; j++) {
        flatdocmenu.push(docmenu[i].children[j]);
      }
    }
  }

  // Find active page:
  for (let i = 0; i < flatdocmenu.length; i++) {
    if (flatdocmenu[i].tag === 'youarehere') {
      next = flatdocmenu[i + 1];
      break;
    } else {
      previous = flatdocmenu[i];
    }
  }

  return [
    !previous,
    previous ? previous.link : '#',
    previous ? previous.text : '???',
    !next,
    next ? next.link : '#',
    next ? next.text : '???',
  ];
}


// -- Public -------------------------------------------------------------------

const TLMenu = RView.Component({

  // -- Overwritten Methods ----------------------------------------------------

  /**
   * Initializes before rendering.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  init() {
    this.state.previoushide = false;
    this.state.previouslink = '#';
    this.state.previoustext = '???';
    this.state.nexthide = false;
    this.state.nextlink = '#';
    this.state.nexttext = '???';
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
    const previoushide = state.previoushide ? ' nav-pagination-hidden' : ''
        , nexthide = state.nexthide ? ' nav-pagination-hidden' : ''
        ;

    return `
      <div class="doc-content-nav-pagination">
        <div class="${previoushide}">
          <a href="${state.previouslink}">
            <div>
              <div>Previous</div>
              <div>${state.previoustext}</div>
            </div>
          </a>
        </div>

        <div class="${nexthide}">
          <a href="${state.nextlink}">
            <div>
              <div>Next</div>
              <div>${state.nexttext}</div>
            </div>
          </a>
        </div>
      </div>
    `;
  },


  // -- Specific Methods -------------------------------------------------------

  /**
   * Updates the menu.
   *
   * @method (arg1, arg2, arg3, arg4)
   * @public
   * @param {Object}        the website as defined in config,
   * @param {Array}         the menu to build,
   * @param {String}        the active language,
   * @param {String}        the active website page,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  fill(docmenu) {
    const [previoushide, previouslink, previoustext, nexthide, nextlink, nexttext] = _set(docmenu);
    this.$setState({
      previoushide,
      previouslink,
      previoustext,
      nexthide,
      nextlink,
      nexttext,
    });
    return this;
  },
});


// Exports:
module.exports = TLMenu;
