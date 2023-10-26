/* *****************************************************************************
 *
 * Generates the HTML pages from MD files.
 *
 *
 * Private Functions:
 *  . render                      customizes Markdown render function,
 *  . _initMarkdown               initializes Markdown renderer,
 *  . _getNormalize               returns the normalize style,
 *  . _getContent                 returns the HTML con tent of the requested file,
 *  . _convertWeb2HTML            converts source files to html pages,
 *  . _generateWebPage            extracts data from the selected source file,
 *  . _createWebPages             creates the web pages by parsing 'config.website',
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
    , yaml      = require('js-yaml')
    ;


// -- Local modules
const themeconfig = require('../../theme-config')
    , config     = require('../../../config')
    , createPage = require('../pages/main')
    ;


// -- Local constants
const { base }     = themeconfig
    , { basepath } = config
    , { dist }     = config
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

  let callouttype
    , name
    ;

  switch (m) {
    case 'note':
      callouttype = 'note';
      name = 'note';
      break;

    case 'info':
      callouttype = 'info';
      name = 'info';
      break;

    case 'success':
      callouttype = 'success';
      name = 'success';
      break;

    case 'warning':
      callouttype = 'warning';
      name = 'warning';
      break;

    case 'error':
      callouttype = 'error';
      name = 'error';
      break;

    default:
      break;
  }

  if (tokens[idx].nesting === 1) {
    // opening tag
    return `
      <div class="${callout} ${callout}-${callouttype}">
        <div>${name}</div>
    `;
  }
  // closing tag
  return '</div>';
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
  md.use(MDCont, 'note', { render });
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
 * @function (arg1)
 * @private
 * @param {String}    the file(s) path,
 * @returns {Array}   the yaml header and the file(s) content,
 * @since 0.0.0
 */
function _getContent(file) {
  let input
    , content
    ;

  if (typeof file === 'string') {
    if (fs.existsSync(file)) {
      input = fs.readFileSync(file, 'utf8');
      content = file.match(/.md/)
        ? md.render(input.replace(/---([\s\S]*?)---/, ''))
        : input.replace(/---([\s\S]*?)---/, '')
      ;
    }
  }

  if (typeof file === 'object') {
    input = '';
    for (let i = 0; i < file.sections.length; i++) {
      if (fs.existsSync(file.sections[i])) {
        input += fs.readFileSync(file.sections[i], 'utf8');
      }
    }
    content = file.sections[0].match(/.md/)
      ? md.render(input.replace(/---([\s\S]*?)---/, ''))
      : input.replace(/---([\s\S]*?)---/, '')
    ;
  }

  // Extract yaml header if any:
  let header = {};
  const result = input.match(/---([\s\S]*?)---/);
  if (Array.isArray(result)) {
    header = yaml.load(result[1]);
  }

  return [header, content];
}

/**
 * Converts source files to html pages.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the list of the web pages,
 * @param {Object}          the menu,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-restricted-syntax, guard-for-in, no-param-reassign, max-len */
function _convertWeb2HTML(webpages, menu) {
  let content
    , output
    , params
    ;

  for (const lang in webpages) {
    for (const page in webpages[lang]) {
      content = webpages[lang][page].content;
      output = webpages[lang][page].output;
      webpages[lang][page].content = null;
      params = {
        title: webpages[lang][page].title,
        description: webpages[lang][page].description,
        company: config.company,
      };
      const html = createPage(webpages, lang, page, content, _getNormalize(), params, menu);

      if (output) {
        fse.outputFile(`${dist}/${output}`, html, (err) => {
          if (err) {
            throw new Error(err);
          }
        });
      }
    }
  }
}
/* eslint-enable no-restricted-syntax, guard-for-in, no-param-reassign, max-len */

/**
 * Extracts data from the selected source file.
 *
 * @function (arg1)
 * @private
 * @param {String/Object}   the input file(s),
 * @returns {Object}        the page data,
 * @since 0.0.0
 */
function _generateWebPage(page, lang) {
  const PATH_IN  = `${base}/site/webpages/`
      , PATH_OUT = ''
      ;

  const output = typeof page === 'object'
    ? page.sections[0].replace(PATH_IN, PATH_OUT).replace(/.md/, '.html')
    : page.replace(PATH_IN, PATH_OUT).replace(/.md/, '.html')
  ;

  const [header, content] = _getContent(page);

  return {
    type: 'web',
    lang,
    name: header.name,
    title: header.title,
    description: header.description,
    company: config.company,
    content,
    output,
    link: `${basepath}${output}`,
  };
}

/**
 * Creates the web pages by parsing 'config.website'.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the list of the web pages,
 * @param {Object}          the menu,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-restricted-syntax, guard-for-in */
function _createWebPages(webpages, menu, done) {
  const web = [];

  let page;
  for (const lang in webpages) {
    if (!web[lang]) web[lang] = [];

    for (let i = 0; i < webpages[lang].length; i++) {
      page = _generateWebPage(webpages[lang][i], lang);
      web[lang][page.name] = page;
    }
  }

  _convertWeb2HTML(web, menu);
  done(web);
}
/* eslint-enable no-restricted-syntax, guard-for-in */


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

  let pending = PENDING
    , webpages
    , docpages
    ;

  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:project:pages\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done(webpages, docpages);
    }
  }

  _initMarkdown();
  _createWebPages(config.website, config.menu, (data) => {
    webpages = data;
    next();
  });
}


// -- Export
module.exports = Build;
