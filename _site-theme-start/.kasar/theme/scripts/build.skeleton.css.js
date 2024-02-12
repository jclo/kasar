/* *****************************************************************************
 *
 * Generates the css output file.
 *
 * Private Functions:
 *  . _cphighlightcss             copies css files to '_dist/css,
 *  . _buildcss                   bundles the css project files,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:skeleton:css,
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
const { dist }          = config
    , { css }           = themeconfig
    , { csshighlight }  = themeconfig
    , bundle            = 'style'
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Copies css files to '_dist/css.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _cphighlightcss(done) {
  if (!csshighlight || !csshighlight.length) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:css:copy:highlight:css\x1b[89m\x1b[0m\'...\n');

  /**
   * Wait all processes completed;
   */
  let pending = csshighlight.length;
  function _next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:css:copy:highlight:css\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  let filename;
  for (let i = 0; i < csshighlight.length; i++) {
    filename = path.basename(csshighlight[i]);
    fs.cp(csshighlight[i], `${dist}/css/${filename}`, (err) => {
      if (err) throw new Error(err);
      _next();
    });
  }
}

/**
 * Bundles the css project files.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _buildcss(done) {
  if (!css || !css.length) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:css:build:css\x1b[89m\x1b[0m\'...\n');

  const options = {
    specialComments: 1,
    format: 'keep-breaks',
    // rebaseTo: './theme/pages/components/css',
  };

  let mincss = ''
    , content
    , afile
    ;

  for (let i = 0; i < css.length; i++) {
    content = fs.readFileSync(css[i], 'utf-8');

    afile = path.resolve(css[i]);
    options.rebaseTo = path.dirname(afile);
    mincss += new CleanCSS(options).minify({ [afile]: { styles: content } }).styles;
  }
  mincss = mincss.replace(/..\/webfonts/g, '../fonts/fontawesome-free/webfonts');

  fs.writeFile(`${dist}/css/${bundle}.css`, mincss, { encoding: 'utf8' }, (err) => {
    if (err) throw new Error(err);

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mbuild:skeleton:css:build:css\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:css.
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
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:css\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:css\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _buildcss(next);
  _cphighlightcss(next);
}


// -- Export
module.exports = Build;
