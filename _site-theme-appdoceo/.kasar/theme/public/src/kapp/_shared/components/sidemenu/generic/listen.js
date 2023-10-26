/** ************************************************************************
 *
 * Listens DOM events for the side menu component.
 *
 * listens.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _listenFlagWithChildren     opens or closes a flag menu with children when clicked,
 *  . _listenMenuWithChildren     opens or closes a menu with children when clicked,
 *  . _listenSimpleMenu           sends a message when a child menu is clicked
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


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Opens or closes a flag menu with children when clicked.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the side menu component,
 * @returns {}              -,
 * @since 0.0.0
 */
function _listenFlagWithChildren(that) {
  that.$().on('click', (e) => {
    if (e.target.tagName === 'SPAN'
        && e.target.parentNode.classList.contains('pure-menu-link')
        && e.target.parentNode.parentNode.classList.contains('pure-menu-has-children')
    ) {
      e.preventDefault();
      const data = e.target.parentNode.parentNode.getAttribute('data-menu');
      if (data) {
        const index = that.state.openmenu.indexOf(data);
        if (index === -1) {
          that.state.openmenu.push(data);
        } else {
          that.state.openmenu.splice(index, 1);
        }
        that.$setState({});
      }
    }
  });
}

/**
 * Opens or closes a menu with children when clicked.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the side menu component,
 * @returns {}              -,
 * @since 0.0.0
 */
function _listenMenuWithChildren(that) {
  that.$().on('click', (e) => {
    if (e.target.classList.contains('pure-menu-link')
      && e.target.parentNode.classList.contains('pure-menu-has-children')
    ) {
      e.preventDefault();
      const data = e.target.parentNode.getAttribute('data-menu');

      if (data) {
        const index = that.state.openmenu.indexOf(data);
        if (index === -1) {
          that.state.openmenu.push(data);
        } else {
          that.state.openmenu.splice(index, 1);
        }
        that.$setState({});
      }
    }
  });
}

/**
 * Sends a message when a child menu is clicked.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the side menu component,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _listenSimpleMenu(that) {
  that.$().on('click', (e) => {
    if (e.target.classList.contains('pure-menu-link')
      && !e.target.classList.contains('pure-menu-fi')
      && e.target.parentNode.classList.contains('pure-menu-item')
      && !e.target.parentNode.classList.contains('pure-menu-has-children')
    ) {
      e.preventDefault();
      const data = e.target.parentNode.getAttribute('data-menu');
      if (data) {
        that.$emit('kapp:from:_shared:components:sidemenu:to:app:contents:views:load:page', {
          menu: data,
          callback: (() => {
            that.$setState({ activemenu: data });
          }),
        });
      }
    }
  });
}
/* eslint-enable no-param-reassign */

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
    _listenSimpleMenu(that);
    _listenMenuWithChildren(that);
    _listenFlagWithChildren(that);
  },
};


// -- Export
export default Listen;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
