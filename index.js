/* eslint-env node */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */

'use strict';

// -- Node modules
const { Transform } = require('stream')
    ;


// -- Local modules
const createsitemap = require('./libs/createsitemap')
    , { version }   = require('./package.json')
    ;


// -- Local constants


// -- Local variables


// -- Main
module.exports = {
  VERSION: version,

  /**
   * Creates the sitemap.
   *
   * @method (arg1, arg2, arg3, arg4)
   * @public
   * @param {String}    the website domain url,
   * @param {Array}     the url extension for the website pages,
   * @param {Array}     the extra url to add to the sitemap,
   * @param {Array}     the url to exclude from the sitemap,
   * @returns {Object}  returns the new trasnform stream object,
   * @since 0.0.0
   */
  sitemap(url, pages, extra, expired) {
    const transformStream = new Transform({ objectMode: true });
    transformStream._transform = function(file, encoding, callback) {
      if (file.isNull()) return callback(null, file);
      if (file.isStream()) return callback(null, file);
      if (file.isBuffer()) return callback(null, createsitemap(file, url, pages, extra, expired));
      return callback(null, file);
    };
    return transformStream;
  },
};
