// ESLint declarations
/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */

'use strict';

// -- Node modules
const nopt        = require('nopt')
    , browserSync = require('browser-sync').create()
    ;


// -- Local modules


// -- Local constants
const VERSION   = '0.0.0-alpha.0'
    , opts      = {
      help: [Boolean, false],
      version: [String, VERSION],
      start: [Boolean, false],
      path: [String, null],
      port: [String, null],
      reload: [Boolean, false],
    }
    , shortOpts = {
      h: ['--help'],
      v: ['--version', VERSION],
    }
    , parsed    = nopt(opts, shortOpts, process.argv, 2)
    ;


// -- Private Functions --------------------------------------------------------

/**
 * Reloads the browser after a rebuilt.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function reload() {
  browserSync.reload();
}

/**
 * Starts the server.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the path,
 * @param {String}          the port to listen,
 * @returns {}              -,
 * @since 0.0.0
 */
function serve(path, port) {
  browserSync.init({
    server: {
      baseDir: path || './site/_dist',
    },
    port: port || '8080',
  });
}

/**
 * Executes the script.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function run() {
  if (parsed.start) {
    serve(parsed.path, parsed.port);
    return;
  }

  if (parsed.reload) {
    reload();
  }
}


// -- Main ---------------------------------------------------------------------


// Start script.
run();


// -- oOo --
