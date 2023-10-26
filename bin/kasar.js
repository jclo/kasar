#!/usr/bin/env node
/* *****************************************************************************
 * kasar.js creates static websites.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2023 Mobilabs <contact@mobilabs.fr> (http://www.mobilabs.fr)
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
      theme: [String, null],
      port: [String, null],
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
    'watch              rebuilds if a file in the webpages folder is modified',
    'serve              starts the http server on port 8080',
    '',
    'Options:',
    '',
    '-h, --help         output usage information',
    '-v, --version      output the version number',
    '--theme            the theme to install (currently start, doceo or appdoceo',
    '--port             the listening port (default 8080)',
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
      , start        = '_site-theme-start'
      , doceo        = '_site-theme-doceo'
      , appdoceo     = '_site-theme-appdoceo'
      ;

  // Check if 'site' exists?
  _checkIfAlreadyExist(`${baseapp}/${site}`, () => {
    // Ok, it doesn't exist or we got the confirmation that we can overwrite
    // it. We can now create 'site':

    let theme;
    switch (options.theme) {
      case 'start':
        theme = start;
        break;

      case 'doceo':
        theme = doceo;
        break;

      case 'appdoceo':
        theme = appdoceo;
        break;

      default:
        theme = defaultTheme;
    }

    // Create and fill 'site' and subfolders:
    process.stdout.write(`creates and fills ${site}/${repo} ...\n`);
    shell.mkdir('-p', `${baseapp}/${site}/${repo}`);
    shell.cp('-R', `${basescript}/${theme}/${repo}/*`, `${baseapp}/${site}/${repo}/.`);

    process.stdout.write(`creates and fills ${site}/img ...\n`);
    shell.mkdir('-p', `${baseapp}/${site}/img`);
    shell.cp('-R', `${basescript}/${theme}/img/*`, `${baseapp}/${site}/img/.`);

    if (theme !== appdoceo) {
      process.stdout.write(`creates and fills ${site}/js ...\n`);
      shell.mkdir('-p', `${baseapp}/${site}/js`);
      shell.cp('-R', `${basescript}/${theme}/js/*`, `${baseapp}/${site}/js/.`);
    }

    process.stdout.write(`creates and fills ${site}/php ...\n`);
    shell.mkdir('-p', `${baseapp}/${site}/php`);
    shell.cp('-R', `${basescript}/${theme}/php/*`, `${baseapp}/${site}/php/.`);

    process.stdout.write(`creates and fills ${site}/styles ...\n`);
    shell.mkdir('-p', `${baseapp}/${site}/styles`);
    shell.cp('-R', `${basescript}/${theme}/styles/*`, `${baseapp}/${site}/styles/.`);

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
    if (theme !== appdoceo) {
      shell.cp('-R', `${basescript}/${theme}/tobuildweb/.htaccess`, `${baseapp}/${site}/tobuildweb/.htaccess`);
    }

    if (theme !== appdoceo) {
      process.stdout.write(`creates ${site}/sw.js ...\n`);
      shell.cp('-R', `${basescript}/${theme}/sw.js`, `${baseapp}/${site}/sw.js`);
    }

    // Copy Vendor:
    shell.mkdir('-p', `${baseapp}/${site}/vendor/fonts`);
    shell.cp('-R', `${basescript}/${theme}/vendor/*.md`, `${baseapp}/${site}/vendor/.`);
    if (theme === defaultTheme) {
      shell.mkdir('-p', `${baseapp}/${site}/vendor/fonts/montserrat`);
    }

    // Specific to a particular theme:
    if (options.theme === 'doceo') {
      process.stdout.write(`creates and fills ${site}/webdocpages ...\n`);
      shell.mkdir('-p', `${baseapp}/${site}/webdocpages`);
      shell.cp('-R', `${basescript}/${theme}/webdocpages/*`, `${baseapp}/${site}/webdocpages/.`);

      process.stdout.write(`creates ${site}/docsidemenu.js ...\n`);
      shell.cp('-R', `${basescript}/${theme}/docsidemenu.js`, `${baseapp}/${site}/docsidemenu.js`);
    }
  });
}

/**
 * Runs the script.
 *
 * @function ()
 * @private
 * @param {}           -,
 * @returns {}         -,
 * @since 0.0.0
 */
function _run() {
  if (parsed.help) {
    _help();
  }

  if (parsed.version) {
    process.stdout.write(`${thisscript} version: ${parsed.version}\n`);
    return;
  }

  if (parsed.argv.original[0] === 'init') {
    _init(parsed);
    return;
  }

  if (parsed.argv.original[0] === 'build:skeleton') {
    shell.exec(`node ${baseapp}/${site}/.kasar/theme/tasks/build.skeleton.js`);
    return;
  }

  if (parsed.argv.original[0] === 'build:project') {
    shell.exec(`node ${baseapp}/${site}/.kasar/theme/tasks/build.project.js`);
    return;
  }

  if (parsed.argv.original[0] === 'build') {
    shell.exec(`node ${baseapp}/${site}/.kasar/theme/tasks/build.skeleton.js && node ${baseapp}/${site}/.kasar/theme/tasks/build.project.js`);
    return;
  }

  if (parsed.argv.original[0] === 'watch') {
    shell.exec(`nodemon -e md,html --watch '${baseapp}/${site}/webpages/**/*' --watch '${baseapp}/${site}/webdocpages/**/*' --exec node ${basescript}/bin/kasar.js rebuild`);
    return;
  }

  if (parsed.argv.original[0] === 'rebuild') {
    shell.exec(`node ${site}/.kasar/theme/tasks/build.project.js`);
    shell.exec(`node ${basescript}/tasks/server.js --reload`);
    return;
  }

  if (parsed.argv.original[0] === 'serve') {
    const port = parsed.port && Number.isInteger(Number(parsed.port)) ? parsed.port : '8080';
    shell.exec(`node ${basescript}/tasks/server.js --start --path ${baseapp}/${site}/_dist --port ${port}`);
    return;
  }

  _help();
}


// -- Where the script starts --------------------------------------------------

_run();
