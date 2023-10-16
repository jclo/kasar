/* *****************************************************************************
 *
 * Copiies project images to './site/_dist/img'.
 *
 *
 * Private Functions:
 *  . _copypwebpagesimg           copies images from 'webpages' to './site/_dist/img',
 *  . _copyimg                    copies './site/img' contents to './site/_dist/img',
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:project:img,
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
const fs = require('fs')
    ;


// -- Local modules
const config = require('../../../config')
    , P      = require('./libs/parse')
    ;


// -- Local constants
const { dist } = config
    , source   = './site/webpages'
    ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Copies images from 'webpages' folder to './site/_dist/img' folder.
 * (flatten them)
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _copypwebpagesimg(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:project:img:copypwebpagesimg\x1b[89m\x1b[0m\'...\n');

  /**
   * checks if the passed in file is inside a 'img' folder.
   */
  function filterfn(path) {
    if (path.includes('/img/') && source.match(/\/\./) === null) {
      return true;
    }
    return false;
  }

  P.copy(source, `${dist}/img`, { filter: filterfn }, (err) => {
    if (err) throw new Error(err);

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mbuild:project:img:copypwebpagesimg\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}

/**
 * Copies './site/img' folder contents to './site/_dist/img' folder.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _copyimg(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:project:img:copyimg\x1b[89m\x1b[0m\'...\n');

  fs.cp('./site/img/', `${dist}/img`, { recursive: true }, (err) => {
    if (err) throw new Error(err);

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mbuild:project:img:copyimg\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:project:img.
 *
 * @function (arg1)
 * @public
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function Build(done) {
  const PENDING = 2;

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:project:img\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:project:img\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _copyimg(next);
  _copypwebpagesimg(next);
}


// -- Export
module.exports = Build;
