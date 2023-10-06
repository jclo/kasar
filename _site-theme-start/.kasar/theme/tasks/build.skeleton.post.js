/* *****************************************************************************
 *
 * Executes post skeleton operations if any.
 *
 * Private Functions:
 *  . _buildpost                  does...,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:post:skeleton,
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

'use strict';


// -- Node modules
// const fs   = require('fs')
//     , path = require('path')
//     ;


// -- Local modules
// const themeconfig = require('../../theme-config')
//     , config      = require('../../../config')
//     ;


// -- Local constants
// const { dist } = config
//     ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Does ....
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _buildPost(done) {
  done();
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:post:skeleton.
 *
 * @function (arg1)
 * @public
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function Build(done) {
  const PENDING = 1;

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:post\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:post\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _buildPost(next);
}


// -- Export
module.exports = Build;
