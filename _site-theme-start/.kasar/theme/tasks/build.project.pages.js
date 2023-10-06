/* *****************************************************************************
 *
 * Generates the HTML pages from MD files.
 *
 *
 * Private Functions:
 *  . render                      customizes Markdown render function,
 *  . _initMarkdown               initializes Markdown renderer,
 *  . _getNormalize               returns the normalize style,
 *  . _getContent                 returns the HTML content of the requested file,
 *  . _buildpages                 converts MD contents to HTML pages,
 *  . _createWebPages             creates and saves the web pages,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:project:pages,
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


// -- Node modules
const fs        = require('fs')
    , fse       = require('fs-extra')
    , Markdown  = require('markdown-it')
    , mdAttrs   = require('markdown-it-attrs')
    , MDCont    = require('markdown-it-container')
    , MDAnchors = require('markdown-it-anchor')
    ;


// -- Local modules
const config     = require('../../../config')
    , createPage = require('../pages/main')
    ;


// -- Local constants
const { dist }     = config
    , { basedist } = config
    , md           = new Markdown('commonmark').use(mdAttrs)
    ;


// -- Local variables
let norm
  ;


// -- Private Functions --------------------------------------------------------

/**
 * Customizes Markdown render function.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the markdown token,
 * @param {Array}           the token index,
 * @returns {String}        returns opening and closing tags,
 * @since 0.0.0
 */
function render(tokens, idx) {
  const callout = 'pureplus-callout'
      , m = tokens[idx].info.trim()
      ;

  let callouttype;

  switch (m) {
    case 'info':
      callouttype = 'info';
      break;

    case 'success':
      callouttype = 'success';
      break;

    case 'warning':
      callouttype = 'warning';
      break;

    case 'error':
      callouttype = 'error';
      break;

    default:
      break;
  }

  if (tokens[idx].nesting === 1) {
    // opening tag
    return `<div class="${callout} ${callout}-${callouttype}">\n`;
  }
  // closing tag
  return '</div>\n';
}

/**
 * Initializes Markdown renderer.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _initMarkdown() {
  md.use(mdAttrs);
  md.use(MDCont, 'info', { render });
  md.use(MDCont, 'success', { render });
  md.use(MDCont, 'warning', { render });
  md.use(MDCont, 'error', { render });
  md.use(MDAnchors);
}

/**
 * Returns the normalize style.
 *
 * @function ()
 * @private
 * @param {}          -,
 * @returns {String}  return the normalize style,
 * @since 0.0.0
 */
function _getNormalize() {
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
 * @param {String}    the file(s) path,
 * @returns {String}  the file(s) content,
 * @since 0.0.0
 */
function _getContent(file) {
  let content = '';

  if (typeof file === 'string') {
    if (fs.existsSync(file)) {
      content = file.match(/.md/)
        ? md.render(fs.readFileSync(file, 'utf8'))
        : fs.readFileSync(file, 'utf8');
    }
    return content;
  }

  if (typeof file === 'object') {
    const { path } = file;
    for (let i = 0; i < file.blocks.length; i++) {
      if (fs.existsSync(`${path}/${file.blocks[i]}`)) {
        content += file.blocks[i].match(/.md/)
          ? md.render(fs.readFileSync(`${path}/${file.blocks[i]}`, 'utf8'))
          : fs.readFileSync(`${path}/${file.blocks[i]}`, 'utf8');
      }
    }
  }

  return content;
}

/**
 * Creates and Saves the web pages.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the list of the web pages,
 * @param {Object}          the side menu,
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-restricted-syntax, guard-for-in, max-len */
function _createWebPages(webpages, menu, done) {
  for (const lang in webpages) {
    for (const page in webpages[lang]) {
      const content = _getContent(webpages[lang][page].content);
      const { output } = webpages[lang][page];

      if (output) {
        const html = createPage(webpages, menu, lang, page, content, _getNormalize(), config.company);
        fse.outputFile(`${basedist}/${output}`, html, (err) => {
          if (err) {
            throw new Error(err);
          }
        });
      }
    }
  }

  done();
}
/* eslint-enable no-restricted-syntax, guard-for-in, max-len */


// -- Public -------------------------------------------------------------------

/**
 * Executes build:js.
 *
 * @function (arg1)
 * @public
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function Build(done) {
  const PENDING = 1;

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:project:pages\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:project:pages\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _initMarkdown();
  _createWebPages(config.website, config.menu, next);
}


// -- Export
module.exports = Build;
