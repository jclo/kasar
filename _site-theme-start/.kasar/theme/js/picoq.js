/** ****************************************************************************
 *
 * This is a subset of PicoQ (see it on Github), a library that implements
 * a set of methods to manipulate the DOM (syntax similat to JQuery).
 *
 * picoq.js is built upon the Prototypal Instantiation pattern. It
 * returns an object by calling its constructor. It doesn't use the new
 * keyword.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Constructor:
 *  . PicoQ                       creates and returns the PicoQ object,
 *
 *
 * Private Static Methods:
 *  . none,
 *
 *
 * Public Static Methods:
 *  . none,
 *
 *
 * Public Variables:
 *  . [0]                         the selected DOM element,
 *  . _library                    the name and version of the library,
 *
 *
 * Public Methods:
 *  . DOMready                    waits for the DOM loaded,
 *  . select                      selects a child element,
 *  . selectAll                   selects a node list,
 *
 *  . append                      appends and selects a node, defined by an HTML tag,
 *
 *  . text                        gets/sets the text contents of the element,
 *
 *  . css                         gets/sets the style attribute of the element,
 *
 *  . getClassList                returns the DOMTokenList collection,
 *  . addClass                    adds a class name to the element,
 *  . addClasses                  adds a list of classes to the element,
 *  . removeClass                 removes a class name from the element,
 *  . removeClasses               removes a list of classes from the element,
 *  . hasClass                    checks if the element has the passed-in class,
 *
 *  . attr                        sets or gets the specified attribute,
 *  . removeAttr                  removes the specified attribute,
 *
 *  . on                          attachs an event listener to the current node,
 *  . off                         removes an event listener from the current node,
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* global */
/* eslint-disable strict, no-underscore-dangle */


// -- Vendor Modules


// -- Local Modules


// -- Local Constants


// -- Local Variables
let methods;


// -- Public -------------------------------------------------------------------

/**
 * Returns the PicoQ object.
 * (Prototypal Instantiation Pattern)
 *
 * @constructor (arg1)
 * @public
 * @param {String}          the DOM selector,
 * @returns {Object}        returns the PicoQ object,
 * @since 0.0.0
 */
const PicoQ = function(selector) {
  const obj = Object.create(methods);
  obj._library = {
    name: '{{lib:name}}',
    version: '{{lib:version}}',
  };

  // Selects the first element that matches the selector(s)
  // or selects the entire 'web component':
  obj[0] = selector
    ? document.querySelector(selector)
    : document.querySelector('body');

  return obj;
};

// Attaches constants to PicoQ that provide name and version of the lib.
PicoQ.NAME = '{{lib:name}}';
PicoQ.VERSION = '{{lib:version}}';


// -- Private Static Methods ---------------------------------------------------
// none,


// -- Public Static Methods ----------------------------------------------------
// none,


// -- Public Methods -----------------------------------------------------------

methods = {

  /**
   * Waits for the DOM loaded.
   *
   * @method (arg1)
   * @public
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  DOMready(callback) {
    document.addEventListener('DOMContentLoaded', (e) => {
      if (callback) {
        callback(e);
      }
    });
    return this;
  },

  /**
   * Selects a child element.
   *
   * @method (arg1)
   * @public
   * @param {String}        the selector,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  select(sel) {
    if (typeof sel === 'string' && this[0]) {
      const child = this[0].querySelector(sel);
      if (child) {
        this[0] = child;
      }
    }
    return this;
  },

  /**
   * Selects a node list.
   *
   * @method (arg1)
   * @public
   * @param {String}        the selector,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  selectAll(sel) {
    if (typeof sel === 'string' && this[0]) {
      const node = this[0].querySelectorAll(sel);
      if (node) {
        this[0] = node;
      }
    }
    return this;
  },

  // -- Append -----------------------------------------------------------------
  /**
   * Appends and selects a node, defined by an HTML tag.
   *
   * @method (arg1)
   * @public
   * @param {String}        HTML tage name,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  append(tagName) {
    if (this[0] && typeof tagName === 'string') {
      const element = document.createElement(tagName);
      this[0] = this[0].appendChild(element);
    }
    return this;
  },

  // -- Text -------------------------------------------------------------------
  /**
   * Gets/Sets the text contents of the element,
   *
   * @method (arg1)
   * @public
   * @param {String}        the text contents to add,
   * @returns {String}      returns the text contents or this;,
   * @since 0.0.0
   */
  text(texte) {
    if (this[0]) {
      if (typeof texte === 'string') {
        this[0].textContent = texte;
        return this;
      }
      if (texte === undefined) {
        return this[0].textContent;
      }
    }
    return this;
  },

  // -- CSS --------------------------------------------------------------------
  /**
   * Gets/Sets the style attribute of the element,
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the style attribute,
   * @param {String}        the style attribute value,
   * @returns {String}      returns the style attribute value or this,
   * @since 0.0.0
   */
  css(styleAttr, value) {
    const arr = typeof styleAttr === 'string' ? styleAttr.split('-') : [];
    let attr = '';

    // Convert style attribute name with '-' (ex.: 'font-size' to 'fontSize'):
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        attr += arr[i];
      } else {
        attr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
    }

    if (!value) {
      // Get attribute:
      return this[0] ? this[0].style[attr] : null;
    }

    // Set attribute:
    if (this[0]) {
      this[0].style[attr] = value;
    }
    return this;
  },

  // -- Classes ----------------------------------------------------------------
  /**
   * Returns the DOMTokenList collection of the class attributes of the element.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the DOMTokenList of the element,
   * @since 0.0.0
   */
  getClassList() {
    return this[0] ? this[0].classList : null;
  },

  /**
   * Adds a class name to the element.
   *
   * @method (arg1)
   * @public
   * @param {String}        the class name to add,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  addClass(className) {
    if (this[0] && Object.prototype.toString.call(className) === '[object String]') {
      this[0].classList.add(className);
    }
    return this;
  },

  /**
   * Adds a list of classes to the element.
   *
   * @method (arg1)
   * @public
   * @param {Array}         the list of classes to add,
   * @returns {Object}      returns this,
   * @since 0.0.8
   */
  addClasses(classes) {
    if (this[0] && Array.isArray(classes)) {
      for (let i = 0; i < classes.length; i++) {
        this[0].classList.add(classes[i]);
      }
    }
    return this;
  },

  /**
   * Removes a class name from the element.
   *
   * @method (arg1)
   * @public
   * @param {String}        the class name to remove,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  removeClass(className) {
    if (this[0] && Object.prototype.toString.call(className) === '[object String]') {
      this[0].classList.remove(className);
    }
    return this;
  },

  /**
   * Removes a list of classes from the element.
   *
   * @method (arg1)
   * @public
   * @param {Array}         the list of classes to remove,
   * @returns {Object}      returns this,
   * @since 0.0.8
   */
  removeClasses(classes) {
    if (this[0] && Array.isArray(classes)) {
      for (let i = 0; i < classes.length; i++) {
        this[0].classList.remove(classes[i]);
      }
    }
    return this;
  },

  /**
   * Checks if the element has the passed-in class.
   *
   * @method (arg1)
   * @public
   * @param {String}        the class name,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.8
   */
  hasClass(className) {
    const list = this[0] ? this[0].classList.value.split(' ') : [];
    return (Object.prototype.toString.call(className) === '[object String]' && list.indexOf(className) !== -1);
  },


  // -- Attributes -------------------------------------------------------------
  /**
   * Sets or Gets the specified attribute.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the attribute name,
   * @param {String}        the attribute value,
   * @returns {String}      returns the attribute value or this,
   * @since 0.0.0
   */
  attr(attribute, value) {
    if (this[0] && attribute && value) {
      this[0].setAttribute(attribute, value);
      return this;
    }
    return this[0] ? this[0].getAttribute(attribute) : null;
  },

  /**
   * Removes the specified attribute.
   *
   * @method (arg1)
   * @public
   * @param {String}        the attribute name,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  removeAttr(attribute) {
    if (this[0] && attribute) {
      this[0].removeAttribute(attribute);
    }
    return this;
  },


  // -- Events -----------------------------------------------------------------
  /**
   * Attachs an event listener to the current node.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the DOM event string,
   * @param {Function}      the listener function,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  on(event, listener) {
    if (this[0] && typeof listener === 'function') {
      this[0].addEventListener(event, listener.bind(this));
    }
    return this;
  },

  /**
   * Removes an event listener from the current node.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the DOM event string,
   * @param {Function}      the listner function,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  off(event, listener) {
    if (this[0]) {
      this[0].removeEventListener(event, listener);
    }
    return this;
  },
};


// -- Export
// none,

/* eslint-enable strict, no-underscore-dangle */
