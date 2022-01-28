#!/usr/bin/env node
/* *****************************************************************************
 * kasar.js creates static websites.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Mobilabs <contact@mobilabs.fr> (http://www.mobilabs.fr)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * ************************************************************************** */
/* eslint one-var: 0,semi-style: 0, no-underscore-dangle: 0 */

'use strict';

// -- Node modules
const fs           = require('fs')
    , readline     = require('readline')
    , nopt         = require('nopt')
    , path         = require('path')
    , shell        = require('shelljs')
    ;


// -- Local modules

// -- Local constants
const thisscript  = 'kasar'
    , site        = 'site'
    , repo        = '.kasar'
    , baseapp     = process.cwd()
    , basescript  = __dirname.replace('/bin', '')
    , { version } = require('../package.json')
    // Command line Options
    , opts = {
      help: [Boolean, false],
      version: [String, null],
      path,
      name: [String, null],
    }
    , shortOpts = {
      h: ['--help'],
      v: ['--version', version],
    }
    , parsed = nopt(opts, shortOpts, process.argv, 2)
    ;

// -- Local variables


// -- Private functions --------------------------------------------------------

/**
 * Dispays the help message.
 *
 * @function ()
 * @private
 * @param {}           -,
 * @returns {}         -,
 * @since 0.0.0
 */
function _help() {
  const message = ['',
    'Usage: command [options]',
    '',
    'init               creates the repository for the static website',
    'build              builds the static website',
    'serve              runs the static website inside a browser',
    '',
    'Options:',
    '',
    '-h, --help         output usage information',
    '-v, --version      output the version number',
    '',
  ].join('\n');

  process.stdout.write(`${message}\n`);
  process.exit(0);
}


/**
 *  Checks if a website already exists.
 *
 * @function ()
 * @private
 * @param {}           -,
 * @returns {}         -,
 * @since 0.0.0
 */
function _checkIfAlreadyExist(dir, cb) {
  // Does the folder 'dir' exist?
  if (!fs.existsSync(dir)) {
    cb();
    return;
  }

  // The folder 'site' exists. Wait for a confirmation before overwriting it:
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `The folder '${dir}' already exists. Do you want to overwrite it?\nChoice (y/N): `,
  });

  // Prompt the message:
  rl.prompt();

  // Read stdin:
  rl.on('line', (line) => {
    switch (line.trim()) {
      case 'y':
      case 'yes':
      case 'Y':
      case 'YES':
      case 'Yes':
        process.stdout.write('Ok, we understand that you\'re ready to overwrite the previous site.\nWe proceed...\n');
        // Delete 'site':
        shell.rm('-rf', dir);
        // Launch the 'close' event to stop reading the stdin.
        rl.close();
        break;

      case 'n':
      case 'no':
      case 'N':
      case 'NO':
      case 'No':
        process.stdout.write('Ok, it\'s a No. Bye bye!\n');
        // Abort the script:
        process.exit(0);
        break;

      default:
        process.stdout.write(`Say what? I might have heard '${line.trim()}'\n`);
        // Re-ask the confirmation:
        rl.prompt();
        break;
    }
  });

  rl.on('close', () => {
    cb();
  });
}

/**
 * Creates the skeleton of the website.
 *
 * @function ()
 * @private
 * @param {}           -,
 * @returns {}         -,
 * @since 0.0.0
 */
function _init(options) {
  const defaultTheme = '_site-theme-start'
      , orion        = '_site-theme-orion'
      , code         = '_site-theme-code'
      ;

  // Check if 'site' exists?
  _checkIfAlreadyExist(`${baseapp}/${site}`, () => {
    // Ok, it doesn't exist or we got the confirmation that we can overwrite
    // it. We can now create 'site':

    let theme;
    if (options.argv.remain[1] === 'orion') {
      theme = orion;
    } else if (options.argv.remain[1] === 'code') {
      theme = code;
    } else {
      theme = defaultTheme;
    }

    // Create and fill'site' and subfolders:
    process.stdout.write(`creates and fills ${site}/${repo} ...\n`);
    shell.mkdir('-p', `${baseapp}/${site}/${repo}`);
    shell.cp('-R', `${basescript}/${theme}/${repo}/*`, `${baseapp}/${site}/${repo}/.`);

    process.stdout.write(`creates and fills ${site}/img ...\n`);
    shell.mkdir('-p', `${baseapp}/${site}/img`);
    shell.cp('-R', `${basescript}/${theme}/img/README.md`, `${baseapp}/${site}/img/.`);
    shell.cp('-R', `${basescript}/${theme}/img/icons`, `${baseapp}/${site}/img/.`);

    process.stdout.write(`creates and fills ${site}/php ...\n`);
    shell.mkdir('-p', `${baseapp}/${site}/php`);
    shell.cp('-R', `${basescript}/${theme}/php/*`, `${baseapp}/${site}/php/.`);

    process.stdout.write(`creates and fills ${site}/styles ...\n`);
    shell.mkdir('-p', `${baseapp}/${site}/styles`);
    shell.cp('-R', `${basescript}/${theme}/styles/*`, `${baseapp}/${site}/styles/.`);

    process.stdout.write(`creates and fills ${site}/tasks ...\n`);
    shell.mkdir('-p', `${baseapp}/${site}/tasks`);
    shell.cp('-R', `${basescript}/${theme}/tasks/*`, `${baseapp}/${site}/tasks/.`);

    process.stdout.write(`creates and fills ${site}/tobuildweb ...\n`);
    shell.mkdir('-p', `${baseapp}/${site}/tobuildweb`);
    shell.cp('-R', `${basescript}/${theme}/tobuildweb/*`, `${baseapp}/${site}/tobuildweb/.`);

    process.stdout.write(`creates and fills ${site}/webpages ...\n`);
    shell.mkdir('-p', `${baseapp}/${site}/webpages`);
    shell.cp('-R', `${basescript}/${theme}/webpages/*`, `${baseapp}/${site}/webpages/.`);

    // Create 'config.js':
    process.stdout.write(`creates ${site}/config.js ...\n`);
    shell.cp('-R', `${basescript}/${theme}/config.js`, `${baseapp}/${site}/config.js`);

    // Create .htacess files:
    process.stdout.write('creates the .htaccess files ...\n');
    shell.cp('-R', `${basescript}/${theme}/php/.htaccess`, `${baseapp}/${site}/php/.htaccess`);
    shell.cp('-R', `${basescript}/${theme}/tobuildweb/.htaccess`, `${baseapp}/${site}/tobuildweb/.htaccess`);

    if (theme === orion || theme === code) {
      // Create 'sw.js':
      process.stdout.write(`creates ${site}/sw.js ...\n`);
      shell.cp('-R', `${basescript}/${theme}/sw.js`, `${baseapp}/${site}/sw.js`);
    }

    // Copy Vendor Highlight:
    if (theme === orion || theme === code) {
      shell.mkdir('-p', `${baseapp}/${site}/vendor`);
      shell.cp('-R', `${basescript}/${theme}/vendor/*.md`, `${baseapp}/${site}/vendor/.`);
    }

    if (theme === code) {
      shell.mkdir('-p', `${baseapp}/${site}/vendor/highlight/styles`);
      shell.cp('-R', `${basescript}/${theme}/vendor/highlight/*.js`, `${baseapp}/${site}/vendor/highlight/.`);
      shell.cp('-R', `${basescript}/${theme}/vendor/highlight/styles/default.css`, `${baseapp}/${site}/vendor/highlight/styles/default.css`);
    }
  });
}


// -- Where the script starts --------------------------------------------------

if (parsed.help) {
  _help();
}

if (parsed.version) {
  // console.log('umdlib version: ' + parsed.version);
  process.stdout.write(`${thisscript} version: ${parsed.version}\n`);
  process.exit(0);
}

if (parsed.argv.remain[0] === 'init') {
  _init(parsed);
} else if (parsed.argv.remain[0] === 'build') {
  shell.exec(`gulp -f ${site}/${repo}/gulpfile.js build`);
} else if (parsed.argv.remain[0] === 'serve') {
  shell.exec(`gulp -f ${site}/${repo}/gulpfile.js serve`);
} else {
  _help();
}
