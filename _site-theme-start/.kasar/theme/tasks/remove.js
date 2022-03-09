// ESLint declarations
/* eslint-env node */
/* eslint one-var: 0, semi-style: 0, import/no-extraneous-dependencies: 0 */

'use strict';

// -- Node modules
const del = require('del')
    ;


// -- Local modules
const config      = require('../../../config')
    ;


// -- Local constants
const { dist } = config
    ;


// -- Local variables


// -- Gulp Private Tasks

/**
 * Removes the current dist.
 */
function remove(done) {
  del.sync(dist, { force: true });
  done();
}


// Gulp Public Tasks
module.exports = remove;
