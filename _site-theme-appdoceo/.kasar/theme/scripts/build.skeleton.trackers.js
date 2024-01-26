/* *****************************************************************************
 *
 * Copies trackers.
 *
 * Private Functions:
 *  . _copygoogleverify           copies google identification file,
 *  . _copykiwitrackerphp         copies kiwi php tracker,
 *  . _copykiwitrackerjs          copies kiwi js tracker,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:skeleton:trackers,
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
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    ;


// -- Local constants
const { dist }    = config
    , { tracker } = themeconfig
    , { google }  = config
    ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Copies Google's Analytics identification file.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _copygoogleverify(done) {
  if (!google || !google.verify || !google.verify.v2 || !google.verify.v2.length) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:trackers:copy:google:verify:v2\x1b[89m\x1b[0m\'...\n');

  const filename = path.basename(google.verify.v2);
  fs.cp(google.verify.v2, `${dist}/${filename}`, (err) => {
    if (err) throw new Error(err);

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mbuild:skeleton:trackers:copy:google:verify:v2\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}

/**
 * Copies kiwi php tracker.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _copykiwitrackerphp(done) {
  if (!tracker || !tracker.php) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:trackers:copy:kiwi:tracker:php\x1b[89m\x1b[0m\'...\n');

  const filename = path.basename(tracker.php);
  fs.cp(tracker.php, `${dist}/php/${filename}`, (err) => {
    if (err) throw new Error(err);

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mbuild:skeleton:trackers:copy:kiwi:tracker:php\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}

/**
 * Copies kiwi js tracker.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _copykiwitrackerjs(done) {
  if (!tracker || !tracker.js) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:trackers:copykiwitrackerjs\x1b[89m\x1b[0m\'...\n');

  const filename = path.basename(tracker.js);
  fs.cp(tracker.js, `${dist}/js/${filename}`, (err) => {
    if (err) throw new Error(err);

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mbuild:skeleton:trackers:copykiwitrackerjs\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}


// -- Public -------------------------------------------------------------------

/**
 * Executes copy:trackers.
 *
 * @function (arg1)
 * @public
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function Build(done) {
  const PENDING = 3;

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:trackers\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:trackers\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _copykiwitrackerjs(next);
  _copykiwitrackerphp(next);
  _copygoogleverify(next);
}


// -- Export
module.exports = Build;
