// ESLint declarations
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */

'use strict';

// -- Node modules
const { Transform } = require('stream')
    ;


// -- Local modules


// -- Local constants


// -- Local variables


// -- Private Functions --------------------------------------------------------


// -- Public Function(s) -------------------------------------------------------

module.exports = function(options) {
  // Create a Transform Stream Object:
  const transformStream = new Transform({ objectMode: true })
      ;

  /**
   * Overloads the _transform stream method.
   *
   * @method
   * @param {Object}    Gulp Stream Object,
   * @param {String}    type of stream encoding (String or Buffer),
   * @param {function}  function to call at completion. It has two arguments
   *                    error and data,
   */
  transformStream._transform = function(file, encoding, callback) {
    if (file.isNull()) {
      // nothing to do
      callback(null, file);
      return;
    }

    if (file.isStream()) {
      // file.contents is a Stream - https://nodejs.org/api/stream.html
      callback(null, file);
      return;

      // or, if you can handle Streams:
      // file.contents = file.contents.pipe(...
      // return callback(null, file);
    }

    if (file.isBuffer()) {
      // file.contents is a Buffer - https://nodejs.org/api/buffer.html
      callback(null, file);
      return;

      // or, if you can handle Buffers:
      // file.contents = ...
      // return callback(null, file);
    }

    callback(null, file);
  };

  // return the new transform stream object:
  return transformStream;
};
