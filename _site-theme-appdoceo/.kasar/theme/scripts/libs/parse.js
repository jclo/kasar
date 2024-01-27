/* *****************************************************************************
 *
 * Parses folders and returns data.
 *
 * parse.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _walk                       returns the list of parsed files,
 *  . _copy                       copies the matching files in the dest. folder,
 *
 *
 * Public Static Methods:
 *  . copy                        copies the matching files in the dest. folder,
 *  . walk                        returns the list of parsed files,
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0,
  import/no-extraneous-dependencies: 0 */


// -- Node modules
const fs   = require('fs')
    , path = require('path')
    ;


// -- Local modules


// -- Local constants


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Returns the list of files in the folder and subfolders.
 *
 * @function (arg1, arg2)
 * @private
 * @param {string}          the folder path,
 * @param {function}        function to call at the completion.
 * @returns {}              -,
 * @since 0.0.0
 */
function _walk(dir, done) {
  let results = []
    , pending
    ;

  fs.readdir(dir, (err, list) => {
    if (err) { done(err); return; }
    pending = list.length;
    if (!pending) { done(null, results); return; }

    list.forEach((file) => {
      const pathname = path.resolve(dir, file);

      fs.stat(pathname, (err1, stat) => {
        if (stat && stat.isDirectory()) {
          _walk(pathname, (err2, res) => {
            results = results.concat(res);
            pending -= 1;
            if (!pending) done(null, results);
          });
        } else {
          results.push(pathname);
          pending -= 1;
          if (!pending) done(null, results);
        }
      });
    });
  });
}

/**
 * Copies the matching files in the destination folder.
 *
 * Nota:
 * If the function filter is defined in the option object and if it
 * returns true, the file is copied. If filter is missing or returns
 * false no file is copied.
 * This function returns the lists of found files in the callback done.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {string}          the source folder,
 * @param {string}          the destination folder,
 * @param {Object}          the options,
 * @param {function}        function to call at the completion.
 * @returns {}              -,
 * @since 0.0.0
 */
function _copy(source, dest, options, done) {
  let results = []
    , pending
    ;

  fs.readdir(source, (err, list) => {
    if (err) { done(err); return; }
    pending = list.length;
    if (!pending) { done(null, results); return; }

    list.forEach((file) => {
      const pathname = path.resolve(source, file);

      fs.stat(pathname, (err1, stat) => {
        if (stat && stat.isDirectory()) {
          _copy(pathname, dest, options, (err2, res) => {
            results = results.concat(res);
            if (options && options.filter && options.filter(res)) {
              fs.cp(res, `${dest}/${path.basename(res)}`, () => {
                pending -= 1;
                if (!pending) done(null, results);
              });
            } else {
              pending -= 1;
              if (!pending) done(null, results);
            }
          });
        } else {
          results.push(pathname);
          if (options && options.filter && options.filter(pathname)) {
            fs.cp(pathname, `${dest}/${path.basename(pathname)}`, () => {
              pending -= 1;
              if (!pending) done(null, results);
            });
          } else {
            pending -= 1;
            if (!pending) done(null, results);
          }
        }
      });
    });
  });
}


// -- Public Methods -----------------------------------------------------------

const Parse = {


  /**
   * Copies the matching files in the destination folder.
   *
   * @method (source, dest, options, done)
   * @public
   * @param {string}        the source folder,
   * @param {string}        the destination folder,
   * @param {Object}        the options,
   * @param {function}      function to call at the completion.
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  copy(source, dest, options, callback) {
    _copy(source, dest, options, (err, resp) => {
      if (callback) {
        callback(err, resp);
      }
    });
    return this;
  },

  /**
   * Returns the list of files in the folder and subfolders.
   *
   * @method (arg1, arg2)
   * @public
   * @param {string}        the folder path,
   * @param {function}      function to call at the completion.
   * @returns {}            -,
   * @since 0.0.0
   */
  walk(source, callback) {
    _walk(source, (err, resp) => {
      if (callback) {
        callback(err, resp);
      }
    });
    return this;
  },
};


// -- Export
module.exports = Parse;
