/* eslint-env node */
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Local modules
/* eslint-disable global-require, import/no-unresolved, brace-style */
let kasar;
try { if (require.resolve('@mobilabs/kasar')) { kasar = require('@mobilabs/kasar'); }
} catch (e) { kasar = require('../../../../index'); }
/* eslint-enable global-require, import/no-unresolved, brace-style */

module.exports = kasar;
