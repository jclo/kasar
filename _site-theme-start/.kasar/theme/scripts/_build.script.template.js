#!/usr/bin/env node
/* *****************************************************************************
 *
 * Does ...
 *
 * build.script.template.js script creates ...
 *
 * Private Functions:
 *  . _help                       displays the help message,
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
/* global */
/* eslint no-unused-vars: 0 */


// -- Vendor Modules
import fs from 'fs';
import path from 'path';
import nopt from 'nopt';


// -- Local Modules
import themeconfig from '../../theme-config.js';
import config from '../../../config.js';


// -- Local Constants
const VERSION   = '0.0.0-alpha.0'
    , opts      = {
      help: [Boolean, false],
      version: [String, null],
    }
    , shortOpts = {
      h: ['--help'],
      v: ['--version', VERSION],
    }
    , parsed    = nopt(opts, shortOpts, process.argv, 2)
    , { base }  = themeconfig
    , { dist }  = config
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
    '                       does ...',
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
 * Does ....
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _xxx(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:script:template:xxx\x1b[89m\x1b[0m\'...\n');

  // ...

  const d2 = new Date() - d1;
  process.stdout.write(`Finished '\x1b[36mbuild:script:template:xxx\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
  done();
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
    process.stdout.write('Starting \'\x1b[36mbuild:script:template\x1b[89m\x1b[0m\'...\n');

    let pending = PENDING;
    /**
     * Executes done until completion.
     */
    function done() {
      pending -= 1;
      if (!pending) {
        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mbuild:script:template\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      }
    }

    _xxx(done);
  },
};


// -- Where the script starts --------------------------------------------------
Lib.run();


// -- oOo --
