/** ************************************************************************
 *
 * Listens DOM events for the side menu component.
 *
 * listens.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _listenSimpleFlagMenu       sends a message when a flag or language is clicked,
 *  . _listen                     listens DOM events,
 *  . _listenDOMEvents            listens the DOM events,
 *
 *
 * Public Static Methods:
 *  . listenDOMEvents             starts listening the generic DOM events,
 *  . listen                      starts listening custom events,
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ********************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules


// -- Local Modules


// -- Local Constants
const SWITCH_THEME_MENU = 'switchthemesidemenu'
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Sends a message when a flag or language is clicked.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the side menu component,
 * @returns {}              -,
 * @since 0.0.0
 */
function _listenSimpleFlagMenu(that) {
  that.$().on('click', (e) => {
    let data;

    if (e.target.tagName === 'SPAN'
        && e.target.parentNode.classList.contains('pure-menu-link')
        && e.target.parentNode.classList.contains('pure-menu-fi')
    ) {
      e.preventDefault();
      data = e.target.parentNode.parentNode.getAttribute('data-menu');
    } else if (e.target.classList.contains('pure-menu-link')
            && e.target.classList.contains('pure-menu-fi')
    ) {
      e.preventDefault();
      data = e.target.parentNode.getAttribute('data-menu');
    }

    if (data) {
      const [lang] = data.split(':');
      that.$emit('kapp:from:app:menu:mobile:to:app:views:change:lang', {
        lang,
        callback: (() => {
          //
        }),
      });
    }
  });
}

/**
 * Listens DOM events.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the state properties,
 * @param {Object}          the optional properties,
 * @returns {Object}        returns the mobile menu,
 * @since 0.0.0
 */
function _listen(that) {
  /**
   * Listens for a click on the logo.
   *
   */
  that.$().on('click', (e) => {
    if ((e.target.tagName === 'SPAN' && e.target.parentNode.classList.contains('pure-menu-heading'))
      || (e.target.classList.contains('pure-menu-heading'))
    ) {
      that.$emit('kapp:from:app:menu:mobile:to:app:views:go:home');
    }
  });

  /**
   * Listens for a click on the theme icon.
   *
   */
  that.$().on('click', (e) => {
    if (e.target.id === SWITCH_THEME_MENU) {
      e.preventDefault();
      that.$emit('kapp:from:app:menus:menu-mobile:to:app:views:switch:theme');
      return;
    }

    if (e.target.tagName === 'A'
        && e.target.firstElementChild
        && e.target.firstElementChild.id === SWITCH_THEME_MENU
    ) {
      e.preventDefault();
      that.$emit('kapp:from:app:menus:menu-mobile:to:app:views:switch:theme');
    }
  });
}

/**
 * Listen the DOM events.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the component object,
 * @returns {}              -,
 * @since 0.0.0
 */
function _listenDOMEvents(that) {
  /**
   * Listens for a click on ....
   *
   */
  that.$().on('click', (/* e */) => {
    //
  });
}


// -- Public Static Methods ------------------------------------------------

const Listen = {

  /**
   * Starts listening the generic DOM events.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the component object,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  listenDOMEvents(that) {
    _listenDOMEvents(that);
    return this;
  },

  /**
   * Starts listening for custom DOM events.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the component object,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  listen(that) {
    _listen(that);
    _listenSimpleFlagMenu(that);
  },
};


// -- Export
export default Listen;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
