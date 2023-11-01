/* *****************************************************************************
 *
 * Creates the index.html and offline.hml files.
 *
 *
 * Private Functions:
 *  . _buildO                      sets offline.html file,
 *  . _buildI                      sets index.html file,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:skeleton:indexhtml,
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
const fs = require('fs')
    ;


// -- Local modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    ;


// -- Local constants
const { dist }      = config
    , { scripts }   = config
    , { index2inc } = themeconfig
    , { off2inc }   = themeconfig
    ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Adds extraa scripts.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be called at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _addScripts() {
  let s = '';

  for (let i = 0; i < scripts.length; i++) {
    s += `<script src="${scripts[i]}"></script>`;
  }

  return s;
}

/**
 * Sets offline.html file.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be called at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _buildO(done) {
  fs.readFile(off2inc, 'utf8', (err, data) => {
    if (err) throw new Error(err);

    const index = data
      .replace(/{{app:title}}/, config.title)
      .replace(/{{app:description}}/, config.description)
      .replace(/{{company:name}}/, config.company.name)
      .replace(/{{company:slogan}}/, config.company.description)
      .replace(/{{company:copyright}}/, config.company.copyright)
      .replace(/{{app:canonical-link}}/, config.company.credits.link)
    ;

    fs.writeFile(`${dist}/offline.html`, index, { encoding: 'utf8' }, (err1) => {
      if (err1) throw new Error(err1);
      done();
    });
  });
}

/**
 * Sets index.html file.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be called at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _buildI(done) {
  fs.readFile(index2inc, 'utf8', (err, data) => {
    if (err) throw new Error(err);

    const index = data
      .replace(/{{app:title}}/, config.title)
      .replace(/{{app:description}}/, config.description)
      .replace(/{{company:name}}/, config.company.name)
      .replace(/{{company:slogan}}/, config.company.description)
      .replace(/{{company:copyright}}/, config.company.copyright)
      .replace(/{{app:canonical-link}}/, config.company.credits.link)
      .replace(/{{base:path}}/g, config.basepath)
      .replace(/<!-- {{extra:scripts}} -->/, _addScripts())
    ;

    done(index);
  });
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:module:template.
 *
 * @function (arg1)
 * @public
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function Build(done) {
  const PENDING = 2;
  let indexpage;

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:project:index:html\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:project:index:html\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done(indexpage);
    }
  }

  _buildI((data) => {
    indexpage = data;
    next();
  });
  _buildO(next);
}


// -- Export
module.exports = Build;
