/* *****************************************************************************
 *
 * Copies files from html5 boilerplate.
 *
 * Private Functions:
 *  . _cpmodernizr                copies modernizr.js from html5-boilerplate,
 *  . _minifynormalize            copies and minifies normalyze.css,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:skeleton:html5,
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


// -- Vendor Modules
const fs       = require('fs')
    , path     = require('path')
    , CleanCSS = require('clean-css')
    ;


// -- Local Modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    ;


// -- Local Constants
const { dist }  = config
    , css       = `${dist}/css`
    , vlibs     = `${dist}/vendor/libs`
    , { html5 } = themeconfig
    , { html5: { modernizr } } = themeconfig
    , { html5: { normalize } } = themeconfig
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Copies modernizr js library.
 * (retrieved from node_modules/html5-boilerplate)
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _cpmodernizr(done) {
  if (!html5 || !html5.modernizr) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:html5:cpmodernizr\x1b[89m\x1b[0m\'...\n');

  fs.readFile(modernizr, 'utf8', (err, data) => {
    if (err) throw new Error(err);

    const modern = path.basename(modernizr);
    fs.writeFile(`${vlibs}/${modern}`, data, { encoding: 'utf8' }, (er) => {
      if (er) throw new Error(er);

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:html5:cpmodernizr\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    });
  });
}

/**
 * Minifies normalyze.css from html5 boilerplate.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _minifynormalize(done) {
  if (!html5 || !html5.normalize) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:hskeleton:html5:minifynormalize\x1b[89m\x1b[0m\'...\n');

  fs.readFile(normalize, 'utf8', (err, data) => {
    if (err) throw new Error(err);

    const options = {
      // specialComments: 1,
      // format: 'keep-breaks',
      rebaseTo: '.',
    };
    const mincss = new CleanCSS(options).minify({ ['normalize.style']: { styles: data } }).styles;

    fs.writeFile(`${css}/normalize.style`, mincss, { encoding: 'utf8' }, (er) => {
      if (er) throw new Error(er);

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:html5:minifynormalize\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    });
  });
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:html5.
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
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:html5\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:html5\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _minifynormalize(next);
  _cpmodernizr(next);
}


// -- Export
module.exports = Build;
