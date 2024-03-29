#!/usr/bin/env node
/* *****************************************************************************
 *
 * Creates the production folder from theme.
 *
 * build.skeleton.js script creates the production folder and copies the
 * files defined in theme-config.js and config.js.
 *
 * Private Functions:
 *  . _help                       displays the help message,
 *  . _clean                      removes the previous production folder,
 *  . _importfiles                copies the web files,
 *  . _build                      executes the child tasks,
 *
 *
 * Public Static Methods:
 *  . run                         executes the script,
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
const fs    = require('fs')
    , path  = require('path')
    , nopt  = require('nopt')
    ;


// -- Local Modules
const themeconfig       = require('../../theme-config')
    , config            = require('../../../config')
    // , buildHTML5        = require('./build.skeleton.html5')
    , buildJS           = require('./build.skeleton.js.js')
    , buildCSS          = require('./build.skeleton.css')
    , buildIMG          = require('./build.skeleton.img')
    , copyFonts         = require('./build.skeleton.fonts')
    , copyJSLibs        = require('./build.skeleton.js.libs')
    , copyTrackers      = require('./build.skeleton.trackers')
    , copyPHP           = require('./build.skeleton.php')
    , buildpostskeleton = require('./build.skeleton.post')
    ;


// -- Local Constants
const VERSION       = '0.0.0-alpha.0'
    , opts          = {
      help: [Boolean, false],
      version: [String, null],
    }
    , shortOpts     = {
      h: ['--help'],
      v: ['--version', VERSION],
    }
    , parsed        = nopt(opts, shortOpts, process.argv, 2)
    // , { base }      = themeconfig
    , { dist }      = config
    , { files2inc } = themeconfig
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Dispays the help message.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _help() {
  const message = ['',
    'Usage: command [options]',
    '',
    'build:skeleton         creates the production folder and copies the files defined in config.js',
    '',
    'Options:',
    '',
    '-h, --help             output usage information',
    '-v, --version          output the version number',
    '',
  ].join('\n');

  process.stdout.write(`${message}\n`);
}

/**
 * Removes the previous production folder.
 * (regenerate a new one with subfolders)
 *
 * @function ([arg1])
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {Object}        returns a promise,
 * @since 0.0.0
 */
function _clean(done) {
  const PENDING = 6;
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:clean\x1b[89m\x1b[0m\'...\n');

  /**
   * Wait all the processes completed;
   */
  let pending = PENDING;
  function _next(resolve) {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:clean\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      resolve();
      if (done) done();
    }
  }

  return new Promise((resolve) => {
    fs.rm(dist, { force: true, recursive: true }, (err1) => {
      if (err1) throw err1;

      fs.mkdir(`${dist}/css`, { recursive: true }, (err2) => {
        if (err2) throw err2;

        fs.writeFile(`${dist}/css/fake.css`, '', { encoding: 'utf8' }, (err3) => {
          if (err3) throw err3;
          _next(resolve);
        });
      });

      fs.mkdir(`${dist}/fonts`, { recursive: true }, (err2) => {
        if (err2) throw err2;
        _next(resolve);
      });

      fs.mkdir(`${dist}/img`, { recursive: true }, (err2) => {
        if (err2) throw err2;
        _next(resolve);
      });

      fs.mkdir(`${dist}/js`, { recursive: true }, (err2) => {
        if (err2) throw err2;
        _next(resolve);
      });

      fs.mkdir(`${dist}/php`, { recursive: true }, (err2) => {
        if (err2) throw err2;
        _next(resolve);
      });

      fs.mkdir(`${dist}//vendor/libs`, { recursive: true }, (err2) => {
        if (err2) throw err2;
        _next(resolve);
      });
    });
  });
}

/**
 * Copies the web files.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _importfiles(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:import:files\x1b[89m\x1b[0m\'...\n');

  /**
   * Wait all processes completed;
   */
  let pending = files2inc.length;
  function _next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:import:files\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  let filename;
  for (let i = 0; i < files2inc.length; i++) {
    filename = path.basename(files2inc[i]);
    fs.cp(files2inc[i], `${dist}/${filename}`, (err) => {
      if (err) throw new Error(err);
      _next();
    });
  }
}

/**
 * Executes the child tasks.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
async function _build(done) {
  const PENDING = 9;

  /**
   * Wait all processes completed;
   */
  let pending = PENDING;
  function next() {
    pending -= 1;
    if (!pending) {
      done();
    }
  }

  _clean(() => {
    _importfiles(next);
    // buildHTML5(next);
    buildJS(next);
    buildCSS(next);
    buildIMG(next);
    copyFonts(next);
    copyJSLibs(next);
    copyTrackers(next);
    copyPHP(next);
    buildpostskeleton(next);
  });
}


// -- Public Static Methods ----------------------------------------------------

const Lib = {

  /**
   * Executes the script.
   *
   * @method ()
   * @public
   * @param {}                -,
   * @returns {}              -,
   * @since 0.0.0
  */
  async run() {
    const PENDING = 1;

    if (parsed.help) {
      _help();
      return;
    }

    if (parsed.version) {
      process.stdout.write(`version: ${parsed.version}\n`);
      return;
    }

    const d1 = new Date();
    process.stdout.write('Starting \'\x1b[36mbuild:skeleton\x1b[89m\x1b[0m\'...\n');

    /**
     * Executes done until completion.
     */
    let pending = PENDING;
    function done() {
      pending -= 1;
      if (!pending) {
        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mbuild:skeleton\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      }
    }

    _build(done);
  },
};


// -- Where the script starts --------------------------------------------------
Lib.run();


// -- oOo --
