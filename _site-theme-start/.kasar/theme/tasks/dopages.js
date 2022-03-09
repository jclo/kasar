// ESLint declarations
/* eslint-env node */
/* eslint one-var: 0, semi-style: 0, import/no-extraneous-dependencies: 0 */

'use strict';

// -- Node modules
const fs       = require('fs')
    , Markdown = require('markdown-it')
    , mdAttrs  = require('markdown-it-attrs')
    ;


// -- Local modules
const config     = require('../../../config')
    , createPage = require('../pages/main')
    ;


// -- Local constants
const md       = new Markdown('commonmark').use(mdAttrs)
    , { dist } = config
    ;


// -- Local variables
let norm
  ;


// -- Private Functions --------------------------------------------------------

/**
 * Returns the normalize style.
 *
 * @function ()
 * @private
 * @param {}          -,
 * @returns {String}  return the normalize style,
 * @since 0.0.0
 */
function getNormalize() {
  if (!norm) {
    if (fs.existsSync(`${dist}/css/normalize.style`)) {
      norm = fs.readFileSync(`${dist}/css/normalize.style`, 'utf8');
    }
  }
  return norm;
}

/**
 * Returns the HTML content of the requested file.
 * (convert it from markdown to html if needed)
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the file path,
 * @returns {String}  the file content,
 * @since 0.0.0
 */
function getContent(path) {
  let content = '';
  if (fs.existsSync(path)) {
    content = path.match(/.md/)
      ? md.render(fs.readFileSync(path, 'utf8'))
      : fs.readFileSync(path, 'utf8');
  }
  return content;
}


// -- Gulp Private Tasks

/**
 * Processes the pages of the website.
 */
function dopages(done) {
  /* eslint-disable-next-line */
  for (const key in config.website) {
    const content = getContent(config.website[key].content);
    const { title } = config.website[key];
    const { description } = config.website[key];
    const { output } = config.website[key];
    const html = createPage(key, title, description, content, getNormalize());

    // Saves the returned generated page to dist.
    fs.writeFile(`${dist}/${output}`, html, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  }
  done();
  return null;
}


// Gulp Public Tasks
module.exports = dopages;
