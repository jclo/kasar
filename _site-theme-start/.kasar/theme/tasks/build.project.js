#!/usr/bin/env node
/* *****************************************************************************
 *
 * Creates the project.
 *
 * build.project.js script creates the HTML pages, the sitemap and collects
 * the images contained in wepages folder.
 *
 * Private Functions:
 *  . _help                       displays the help message,
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
const nopt = require('nopt')
    ;


// -- Local Modules
const buildPages   = require('./build.project.pages')
    , buildSitemap = require('./build.project.sitemap')
    , collectIMG   = require('./build.project.img')
    ;


// -- Local Constants
const VERSION = '0.0.0-alpha.0'
    , opts = {
      help: [Boolean, false],
      version: [String, null],
    }
    , shortOpts = {
      h: ['--help'],
      v: ['--version', VERSION],
    }
    , parsed = nopt(opts, shortOpts, process.argv, 2)
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
    'build:project           creates the html and sitemap.xml files, and collects the images',
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
 * Executes the child tasks.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _build(done) {
  const PENDING = 3;

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

  buildPages(next);
  buildSitemap(next);
  collectIMG(next);
}


// -- Main ---------------------------------------------------------------------

/**
 * Executes the script.
 *
 * @function ()
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
async function run() {
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
  process.stdout.write('Starting \'\x1b[36mbuild:project\x1b[89m\x1b[0m\'...\n');

  /**
   * Executes done until completion.
   */
  let pending = PENDING;
  function done() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:project\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    }
  }

  _build(done);
}


// Start script.
run();


// -- oOo --
