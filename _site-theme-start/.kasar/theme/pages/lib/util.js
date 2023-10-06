/** ************************************************************************
 *
 * Utilities function(s).
 *
 * util.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _minify                     minifies an XML String,
 *
 *
 * Public Static Methods:
 *  . minify                      minifies an XML String,
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

'use strict';

// -- Vendor Modules


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Minifies an XML String.
 *
 * Nota:
 * The two most effective operations are the suppression of the comments and
 * the suppression of the leading blank spaces preceeding a tag.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-multi-spaces */
function _minify(xmlString) {
  const xml = xmlString.replace(/<!--(.*?)-->/g, '')    // remove comments
    .replace(/\n\s+</g, '\n<')              // remove leading spaces before a tag,
    .replace(/\n<\/div>/g, '</div>')        // remove unwanted `\n`,
    .replace(/\n<\/ul>/g, '</ul>')          // -
    .replace(/\n<\/li>/g, '</li>')          // -
    .replace(/\n<\/a>/g, '</a>')            // -
  ;

  return xml;
}
/* eslint-enable no-multi-spaces */


// -- Public Static Methods ------------------------------------------------

const Util = {

  /**
   * Minifies an XMLString.
   *
   * @method (arg1)
   * @public
   * @param {xmlString}     the XMLString to minify,
   * @returns {xmlString}   returns this,
   * @since 0.0.0
   */
  minify(xmlString) {
    return _minify(xmlString);
  },
};


// -- Export
module.exports = Util;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
