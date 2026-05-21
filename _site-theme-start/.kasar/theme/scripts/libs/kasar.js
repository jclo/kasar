// ESLint declarations
/* eslint-env node */
/* eslint one-var: 0, semi-style: 0 */


// -- Local modules
let kasar;

try {
  const mod = await import('@mobilabs/kasar');
  kasar = mod.default ?? mod;
} catch {
  const mod = await import('../../../../../index.js');
  kasar = mod.default ?? mod;
}

export default kasar;
